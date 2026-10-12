const PREFIX = "myapp:";

export function getData(key, fallback) {
  try {
    const saved = localStorage.getItem(PREFIX + key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
