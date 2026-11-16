export const stages = [
  // ==========================================
  // HIRAGANA: BASIC 50 SOUNDS (GOJŪON)
  // ~3 to 5 characters per stage
  // ==========================================
  {
    id: 1,
    name: 'Hiragana: Vowels (あ行)',
    description: 'Foundation vowels: a, i, u, e, o',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['a'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 2,
    name: 'Hiragana: K-Row (か行)',
    description: 'ka, ki, ku, ke, ko',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ka'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 3,
    name: 'Hiragana: S-Row (さ行)',
    description: 'sa, shi, su, se, so',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['sa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 4,
    name: 'Hiragana: T-Row (た行)',
    description: 'ta, chi, tsu, te, to',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ta'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 5,
    name: 'Hiragana: N-Row (な行)',
    description: 'na, ni, nu, ne, no',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['na'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 6,
    name: 'Hiragana: H-Row (は行)',
    description: 'ha, hi, fu, he, ho',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ha'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 7,
    name: 'Hiragana: M-Row (ま行)',
    description: 'ma, mi, mu, me, mo',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ma'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 8,
    name: 'Hiragana: Y-Row (や行)',
    description: 'ya, yu, yo',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 9,
    name: 'Hiragana: R-Row (ら行)',
    description: 'ra, ri, ru, re, ro',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['ra'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 10,
    name: 'Hiragana: W-Row & N (わ行・ん)',
    description: 'wa, wo, n — completes basic Hiragana!',
    script: 'hiragana',
    charFilter: { group: 'hiragana-gojuon', rows: ['wa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // HIRAGANA: VOICED & HALF-VOICED (DAKUTEN / HANDAKUTEN)
  // 5 characters per stage
  // ==========================================
  {
    id: 11,
    name: 'Hiragana: G-Row (が行)',
    description: 'ga, gi, gu, ge, go (Voiced k)',
    script: 'hiragana',
    charFilter: { group: 'hiragana-dakuten', rows: ['ga'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 12,
    name: 'Hiragana: Z-Row (ざ行)',
    description: 'za, ji, zu, ze, zo (Voiced s)',
    script: 'hiragana',
    charFilter: { group: 'hiragana-dakuten', rows: ['za'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 13,
    name: 'Hiragana: D-Row (だ行)',
    description: 'da, di (ji), du (zu), de, do (Voiced t)',
    script: 'hiragana',
    charFilter: { group: 'hiragana-dakuten', rows: ['da'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 14,
    name: 'Hiragana: B-Row (ば行)',
    description: 'ba, bi, bu, be, bo (Voiced h)',
    script: 'hiragana',
    charFilter: { group: 'hiragana-dakuten', rows: ['ba'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 15,
    name: 'Hiragana: P-Row (ぱ行)',
    description: 'pa, pi, pu, pe, po (Handakuten)',
    script: 'hiragana',
    charFilter: { group: 'hiragana-handakuten', rows: ['pa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // HIRAGANA: COMBINATIONS (YŌON)
  // ~6 characters per stage
  // ==========================================
  {
    id: 16,
    name: 'Hiragana Combinations: kya & sha (きゃ・しゃ)',
    description: 'kya, kyu, kyo, sha, shu, sho',
    script: 'hiragana',
    charFilter: { group: 'hiragana-yoon', rows: ['kya', 'sha'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 17,
    name: 'Hiragana Combinations: cha & nya (ちゃ・にゃ)',
    description: 'cha, chu, cho, nya, nyu, nyo',
    script: 'hiragana',
    charFilter: { group: 'hiragana-yoon', rows: ['cha', 'nya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 18,
    name: 'Hiragana Combinations: hya, mya & rya (ひゃ・みゃ・りゃ)',
    description: 'hya, hyu, hyo, mya, myu, myo, rya, ryu, ryo',
    script: 'hiragana',
    charFilter: { group: 'hiragana-yoon', rows: ['hya', 'mya', 'rya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 19,
    name: 'Hiragana Combinations: gya, ja & dya (ぎゃ・じゃ・ぢゃ)',
    description: 'Voiced compounds: gya, gyu, gyo, ja, ju, jo, dya, dyu, dyo',
    script: 'hiragana',
    charFilter: { group: 'hiragana-yoon', rows: ['gya', 'ja', 'dya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 20,
    name: 'Hiragana Combinations: bya & pya (びゃ・ぴゃ)',
    description: 'bya, byu, byo, pya, pyu, pyo — completes Hiragana!',
    script: 'hiragana',
    charFilter: { group: 'hiragana-yoon', rows: ['bya', 'pya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // KATAKANA: BASIC 50 SOUNDS (GOJŪON)
  // ~3 to 5 characters per stage (Identical pacing to Hiragana)
  // ==========================================
  {
    id: 21,
    name: 'Katakana: Vowels (ア行)',
    description: 'Foundation vowels: a, i, u, e, o',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['a'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 22,
    name: 'Katakana: K-Row (カ行)',
    description: 'ka, ki, ku, ke, ko',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ka'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 23,
    name: 'Katakana: S-Row (サ行)',
    description: 'sa, shi, su, se, so (watch out for シ vs ツ)',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['sa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 24,
    name: 'Katakana: T-Row (タ行)',
    description: 'ta, chi, tsu, te, to',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ta'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 25,
    name: 'Katakana: N-Row (ナ行)',
    description: 'na, ni, nu, ne, no',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['na'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 26,
    name: 'Katakana: H-Row (ハ行)',
    description: 'ha, hi, fu, he, ho',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ha'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 27,
    name: 'Katakana: M-Row (マ行)',
    description: 'ma, mi, mu, me, mo',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ma'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 28,
    name: 'Katakana: Y-Row (ヤ行)',
    description: 'ya, yu, yo',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 29,
    name: 'Katakana: R-Row (ラ行)',
    description: 'ra, ri, ru, re, ro',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['ra'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 30,
    name: 'Katakana: W-Row & N (ワ行・ン)',
    description: 'wa, wo, n (watch out for ソ vs ン)',
    script: 'katakana',
    charFilter: { group: 'katakana-gojuon', rows: ['wa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // KATAKANA: VOICED & HALF-VOICED (DAKUTEN / HANDAKUTEN)
  // 5 characters per stage
  // ==========================================
  {
    id: 31,
    name: 'Katakana: G-Row (ガ行)',
    description: 'ga, gi, gu, ge, go (Voiced k)',
    script: 'katakana',
    charFilter: { group: 'katakana-dakuten', rows: ['ga'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 32,
    name: 'Katakana: Z-Row (ザ行)',
    description: 'za, ji, zu, ze, zo (Voiced s)',
    script: 'katakana',
    charFilter: { group: 'katakana-dakuten', rows: ['za'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 33,
    name: 'Katakana: D-Row (ダ行)',
    description: 'da, di (ji), du (zu), de, do (Voiced t)',
    script: 'katakana',
    charFilter: { group: 'katakana-dakuten', rows: ['da'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 34,
    name: 'Katakana: B-Row (バ行)',
    description: 'ba, bi, bu, be, bo (Voiced h)',
    script: 'katakana',
    charFilter: { group: 'katakana-dakuten', rows: ['ba'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 35,
    name: 'Katakana: P-Row (パ行)',
    description: 'pa, pi, pu, pe, po (Handakuten)',
    script: 'katakana',
    charFilter: { group: 'katakana-handakuten', rows: ['pa'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // KATAKANA: COMBINATIONS (YŌON)
  // ~6 characters per stage
  // ==========================================
  {
    id: 36,
    name: 'Katakana Combinations: kya & sha (キャ・シャ)',
    description: 'kya, kyu, kyo, sha, shu, sho',
    script: 'katakana',
    charFilter: { group: 'katakana-yoon', rows: ['kya', 'sha'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 37,
    name: 'Katakana Combinations: cha & nya (チャ・ニャ)',
    description: 'cha, chu, cho, nya, nyu, nyo',
    script: 'katakana',
    charFilter: { group: 'katakana-yoon', rows: ['cha', 'nya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 38,
    name: 'Katakana Combinations: hya, mya & rya (ヒャ・ミャ・リャ)',
    description: 'hya, hyu, hyo, mya, myu, myo, rya, ryu, ryo',
    script: 'katakana',
    charFilter: { group: 'katakana-yoon', rows: ['hya', 'mya', 'rya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 39,
    name: 'Katakana Combinations: gya, ja & dya (ギャ・ジャ・ヂャ)',
    description: 'Voiced compounds: gya, gyu, gyo, ja, ju, jo, dya, dyu, dyo',
    script: 'katakana',
    charFilter: { group: 'katakana-yoon', rows: ['gya', 'ja', 'dya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 40,
    name: 'Katakana Combinations: bya & pya (ビャ・ピャ)',
    description: 'bya, byu, byo, pya, pyu, pyo',
    script: 'katakana',
    charFilter: { group: 'katakana-yoon', rows: ['bya', 'pya'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },

  // ==========================================
  // KATAKANA: EXTENDED (FOREIGN SOUNDS)
  // ~4 to 6 characters per stage
  // ==========================================
  {
    id: 41,
    name: 'Extended Katakana: V-Series (ヴァ〜ヴュ)',
    description: 'va, vi, vu, ve, vo, vyu',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['v'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 42,
    name: 'Extended Katakana: F-Series (ファ〜フュ)',
    description: 'fa, fi, fe, fo, fyu',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['f'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 43,
    name: 'Extended Katakana: W & T-Extended (ウィ・ティ等)',
    description: 'wi, we, wo, ti, tu, tyu',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['w_ext', 't_ext'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 44,
    name: 'Extended Katakana: D, Sh, Ch, J-Extended (ディ・シェ等)',
    description: 'di, du, dyu, she, che, je',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['d_ext', 'sh_ext', 'ch_ext', 'j_ext'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 45,
    name: 'Extended Katakana: Ts & Kw/Gw (ツァ・クァ等)',
    description: 'tsa, tsi, tse, tso, kwa, kwi, kwe, kwo, gwa',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['ts_ext', 'kw_ext', 'gw_ext'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  },
  {
    id: 46,
    name: 'Extended Katakana: Special Vowels (イェ・スィ・ズィ・ホゥ)',
    description: 'ye, si, zi, hu — completes all Katakana!',
    script: 'katakana',
    charFilter: { group: 'katakana-extended', rows: ['other_ext'] },
    unlockCriteria: { minSeen: 3, consecutiveCorrect: 3, maxAvgTime: 4000 }
  }
];
