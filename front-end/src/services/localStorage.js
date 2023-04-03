const saveToLocalStorage = (key, val) => localStorage.setItem(key, JSON.stringify(val));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const removeKeyFromLocalStorage = (key) => localStorage.removeItem(key);

export { saveToLocalStorage, getFromLocalStorage, removeKeyFromLocalStorage };
