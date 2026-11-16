import { getAllKana, getCumulativeKanaForStage, getKanaForStage, stages } from '../src/lib/data/index.js';
import { RomajiTrie } from '../src/lib/utils/trie.js';
import { getInitialCard, updateOnCorrect, updateOnWrong } from '../src/lib/engine/scoring.js';
import { selectNextCard, tickCooldowns } from '../src/lib/engine/weightedRandom.js';
import { checkStageUnlock } from '../src/lib/engine/progression.js';
import { Session } from '../src/lib/engine/session.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('--- Testing Kana Dataset ---');
const allKana = getAllKana();
assert(allKana.length === 250, `Expected exactly 250 kana entries, found ${allKana.length}`);

// Verify extended katakana are present
const vi = allKana.find(k => k.kana === 'ヴィ');
assert(vi && vi.romaji.includes('vi'), 'Extended katakana ヴィ (vi) is present');
const ti = allKana.find(k => k.kana === 'ティ');
assert(ti && ti.romaji.includes('ti'), 'Extended katakana ティ (ti) is present');
const fa = allKana.find(k => k.kana === 'ファ');
assert(fa && fa.romaji.includes('fa'), 'Extended katakana ファ (fa) is present');

console.log('\n--- Testing Balanced Stage Curriculum ---');
assert(stages.length === 46, `Curriculum has 46 bite-sized stages (found ${stages.length})`);
const mappedKana = new Set();
let maxInStage = 0;
let minInStage = 999;
for (const s of stages) {
  const chars = getKanaForStage(s.id);
  if (chars.length > maxInStage) maxInStage = chars.length;
  if (chars.length < minInStage) minInStage = chars.length;
  for (const c of chars) mappedKana.add(c.kana);
}
assert(minInStage >= 3 && maxInStage <= 9, `All stages are bite-sized (min: ${minInStage}, max: ${maxInStage})`);
assert(mappedKana.size === 250, `All 250 characters are covered without gaps (found ${mappedKana.size})`);

console.log('\n--- Testing Trie Auto-Submit ---');
const stage1Chars = getCumulativeKanaForStage(1); // a, i, u, e, o
const trie = new RomajiTrie();
trie.buildFromKana(stage1Chars);

// Single vowel: 'a' should be unambiguous exact match
const lookupA = trie.lookup('a');
assert(lookupA.isExactMatch === true, 'Single vowel "a" is unambiguous exact match in stage 1');

// Non-existent prefix: 'z' should return 0 completions
const lookupZ = trie.lookup('z');
assert(lookupZ.possibleCompletions === 0, 'Invalid prefix "z" returns 0 possible completions');

// Stage 2: add k-row (ka, ki, ku, ke, ko)
const stage2Chars = getCumulativeKanaForStage(2);
trie.buildFromKana(stage2Chars);

// Typing 'k' is ambiguous (could be ka, ki, ku, ke, ko)
const lookupK = trie.lookup('k');
assert(lookupK.isExactMatch === false && lookupK.possibleCompletions === 5, '"k" prefix has 5 completions and is not exact');

// Typing 'ka' becomes unambiguous
const lookupKa = trie.lookup('ka');
assert(lookupKa.isExactMatch === true, '"ka" becomes an unambiguous exact match');

console.log('\n--- Testing Scoring & Weight Mechanics ---');
const card = getInitialCard(vi);
assert(card.weight === 5 && card.box === 1, 'Initial card starts at weight 5, box 1');

// Fast correct answer (<2000ms)
const cardCorrect = updateOnCorrect(card, 1200);
assert(cardCorrect.box === 2, 'Fast correct promotes box to 2');
assert(cardCorrect.weight < 5, 'Weight decreases on correct');
assert(cardCorrect.cooldown === 6, 'Cooldown set to box * 3 = 6');

// Wrong answer demotes to box 1 and boosts weight
const cardWrong = updateOnWrong(cardCorrect, 'bi');
assert(cardWrong.box === 1, 'Wrong demotes box back to 1');
assert(cardWrong.weight > 5, 'Wrong increases weight significantly');
assert(cardWrong.confusionMap['bi'] === 1, 'Records confusion pattern for "bi"');

console.log('\n--- Testing Stage Progression Engine ---');
const cardsStage1 = stage1Chars.map(k => getInitialCard(k));
// Initially stage 1 is not unlocked
const unlock1 = checkStageUnlock(cardsStage1, 1);
assert(unlock1.unlocked === false, 'Initially stage 1 is not unlocked');

// Simulate mastering all 5 cards in stage 1
const masteredCards = cardsStage1.map(c => ({
  ...c,
  totalSeen: 4,
  consecutiveCorrect: 3,
  avgResponseTime: 1500,
}));
const unlock2 = checkStageUnlock(masteredCards, 1);
assert(unlock2.unlocked === true && unlock2.nextStageId === 2, 'Stage 1 unlocks stage 2 when criteria met');

console.log('\n--- Testing Session Stats ---');
const session = new Session();
session.recordAnswer('あ', true, 1200);
session.recordAnswer('い', true, 1100);
session.recordAnswer('う', false, 2500);
const sStats = session.getStats();
assert(sStats.totalAnswered === 3 && sStats.totalCorrect === 2, 'Session tracks totals');
assert(sStats.accuracy === 67, 'Accuracy calculated correctly (67%)');
assert(sStats.weakest[0].kana === 'う', 'Weakest kana identified as "う"');

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} passed, ${failed} failed`);
console.log(`========================================`);

if (failed > 0) process.exit(1);
