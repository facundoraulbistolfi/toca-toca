(function initTocaTocaStateStore(globalObject) {
  const safeGlobal = globalObject || {};

  function readRaw(key) {
    try {
      return localStorage.getItem(key);
    } catch (_error) {
      return null;
    }
  }

  function parseRaw(rawValue) {
    if (!rawValue || typeof rawValue !== 'string') {
      return null;
    }
    try {
      return JSON.parse(decodeURIComponent(rawValue));
    } catch (_firstError) {
      try {
        return JSON.parse(rawValue);
      } catch (_secondError) {
        return null;
      }
    }
  }

  function loadJson(key, sanitizeFn, fallbackFactory) {
    const parsed = parseRaw(readRaw(key));
    if (parsed === null) {
      return typeof fallbackFactory === 'function' ? fallbackFactory() : fallbackFactory;
    }
    if (typeof sanitizeFn !== 'function') {
      return parsed;
    }
    try {
      return sanitizeFn(parsed);
    } catch (_error) {
      return typeof fallbackFactory === 'function' ? fallbackFactory() : fallbackFactory;
    }
  }

  function saveJson(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (_error) {
      return false;
    }
  }

  safeGlobal.TocaTocaStateStore = {
    readRaw,
    parseRaw,
    loadJson,
    saveJson,
  };
})(typeof globalThis !== 'undefined' ? globalThis : window);
