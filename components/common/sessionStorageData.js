export function getSessionStorageData(key) {
  try {
    let data = sessionStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch {
    return undefined;
  }
}

export function setSessionStorageData(key, value) {
  if (typeof window !== 'undefined')
    sessionStorage.setItem(key, JSON.stringify(value));
}
