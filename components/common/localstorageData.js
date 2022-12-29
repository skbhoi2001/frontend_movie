export function getLocalStorageData(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch {
    return undefined;
  }
}

export function setLocalStorageData(key, value) {
  if (typeof window !== 'undefined')
    localStorage.setItem(key, JSON.stringify(value));
}
