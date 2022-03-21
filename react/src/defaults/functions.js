const getLocal = (varName) => {
	return localStorage.getItem(varName) ? JSON.parse(localStorage.getItem(varName)) : false;
};
const saveLocal = (varName, data) => {
	localStorage.setItem(varName, JSON.stringify(data));
};

const setDocumentColor = (name, color) => {
	document.documentElement.style.setProperty(`--${name}`, color);
};

export { getLocal, saveLocal, setDocumentColor };
