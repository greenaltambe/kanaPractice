import { hiraganaGroups } from './hiragana.js';
import { katakanaGroups } from './katakana.js';
import { confusableGroups, getConfusablePartners, areConfusable } from './confusables.js';
import { stages } from './stages.js';

export { hiraganaGroups, katakanaGroups, confusableGroups, getConfusablePartners, areConfusable, stages };

export const allGroups = [...hiraganaGroups, ...katakanaGroups];

/**
 * Returns a flat array of all kana characters across all groups.
 * @returns {Array<{kana: string, romaji: string[], row: string, groupId: string, script: string}>}
 */
export function getAllKana() {
  const result = [];
  for (const group of allGroups) {
    for (const char of group.chars) {
      result.push({
        ...char,
        groupId: group.id,
        groupName: group.name,
        script: group.script
      });
    }
  }
  return result;
}

/**
 * Returns kana belonging to specified group IDs.
 * @param {string[]} groupIds
 * @returns {Array}
 */
export function getKanaByGroups(groupIds) {
  const set = new Set(groupIds);
  const result = [];
  for (const group of allGroups) {
    if (set.has(group.id)) {
      for (const char of group.chars) {
        result.push({
          ...char,
          groupId: group.id,
          groupName: group.name,
          script: group.script
        });
      }
    }
  }
  return result;
}

/**
 * Returns kana for a specific stage definition.
 * @param {number} stageId
 * @returns {Array}
 */
export function getKanaForStage(stageId) {
  const stage = stages.find(s => s.id === stageId);
  if (!stage) return [];

  const filter = stage.charFilter;
  const targetGroupIds = filter.groups ? filter.groups : (filter.group ? [filter.group] : []);
  const targetRows = filter.rows ? new Set(filter.rows) : null;

  const result = [];
  for (const group of allGroups) {
    if (targetGroupIds.includes(group.id)) {
      for (const char of group.chars) {
        if (!targetRows || targetRows.has(char.row)) {
          result.push({
            ...char,
            groupId: group.id,
            groupName: group.name,
            script: group.script,
            stageId: stage.id
          });
        }
      }
    }
  }
  return result;
}

/**
 * Returns all kana up to and including a given stage id (cumulative).
 * @param {number} stageId
 * @returns {Array}
 */
export function getCumulativeKanaForStage(stageId) {
  const result = [];
  const seen = new Set();
  for (let id = 1; id <= stageId; id++) {
    const stageChars = getKanaForStage(id);
    for (const c of stageChars) {
      if (!seen.has(c.kana)) {
        seen.add(c.kana);
        result.push(c);
      }
    }
  }
  return result;
}
