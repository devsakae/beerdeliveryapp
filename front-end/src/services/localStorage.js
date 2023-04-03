const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));
const removeKeyFromLocalStorage = (key) => localStorage.removeItem(key);

export { saveToLocalStorage, getFromLocalStorage, removeKeyFromLocalStorage };
