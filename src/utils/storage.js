/**
 * Local Storage Persistence Manager for SkillScreen AI
 * Ensures screening responses, active application view, results step,
 * and tracked roadmap skills persist across browser refreshes.
 */

const STORAGE_KEYS = {
  SCREENING_DATA: 'skillscreen_screening_data',
  VIEW_STATE: 'skillscreen_view_state',
  COMPLETED_SKILLS_PREFIX: 'skillscreen_completed_skills_'
};

/**
 * Saves active screening progress (answers, current step, question index)
 */
export function saveScreeningData(data) {
  try {
    localStorage.setItem(STORAGE_KEYS.SCREENING_DATA, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to save screening data to localStorage:', err);
  }
}

/**
 * Retrieves saved screening progress from localStorage
 */
export function getSavedScreeningData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SCREENING_DATA);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read screening data from localStorage:', err);
    return null;
  }
}

/**
 * Saves current view state (landing vs assessment, active track, target section)
 */
export function saveViewState(viewState) {
  try {
    localStorage.setItem(STORAGE_KEYS.VIEW_STATE, JSON.stringify(viewState));
  } catch (err) {
    console.warn('Failed to save view state to localStorage:', err);
  }
}

/**
 * Retrieves saved view state from localStorage
 */
export function getSavedViewState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VIEW_STATE);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn('Failed to read view state from localStorage:', err);
    return null;
  }
}

/**
 * Helper to generate normalized storage key for tracked skills
 */
export function getTrackSkillsStorageKey(trackName = 'web_development') {
  const normalized = String(trackName).toLowerCase().replace(/[^a-z0-9]/g, '_');
  return `${STORAGE_KEYS.COMPLETED_SKILLS_PREFIX}${normalized}`;
}

/**
 * Saves completed skill IDs for a given track
 */
export function saveCompletedSkills(trackName, skillIds) {
  try {
    const key = getTrackSkillsStorageKey(trackName);
    localStorage.setItem(key, JSON.stringify(skillIds));
  } catch (err) {
    console.warn('Failed to save completed skills to localStorage:', err);
  }
}

/**
 * Retrieves completed skill IDs for a given track
 */
export function getSavedCompletedSkills(trackName) {
  try {
    const key = getTrackSkillsStorageKey(trackName);
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.warn('Failed to read completed skills from localStorage:', err);
    return [];
  }
}

/**
 * Clears saved screening and view state (for explicit Retake or Reset)
 */
export function clearScreeningData() {
  try {
    localStorage.removeItem(STORAGE_KEYS.SCREENING_DATA);
    localStorage.removeItem(STORAGE_KEYS.VIEW_STATE);
  } catch (err) {
    console.warn('Failed to clear screening data:', err);
  }
}
