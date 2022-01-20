// Configuració idioma pàgina
const configTexts = async () => {
	const getData = async () => {
		let response;
		try {
			const data = await fetch('data.json');
			const jsonData = await data.json();
			response = jsonData;
		} catch (err) {
			response = [err];
		}
		return response;
	};
	const changeTexts = async (lang) => {
		const data = await getData();
		console.log(lang, data.length);
	};

	let navigatorLang = navigator.language || navigator.userLanguage;
	navigatorLang = navigatorLang.includes('ca')
		? 'ca'
		: navigatorLang.includes('es')
		? 'es'
		: 'en';

	const usrLang = localStorage.getItem('userLang')
		? localStorage.getItem('userLang')
		: navigatorLang;
	localStorage.setItem('userLang', usrLang);
	[...document.querySelectorAll('#lang option')].filter(
		(el) => el.value === usrLang
	)[0].selected = true;

	changeTexts(usrLang);

	document.querySelector('#lang').addEventListener('change', (e) => {
		localStorage.setItem('userLang', e.target.value);
		changeTexts(e.target.value);
	});
};
// Configuració color pàgina
const configMode = () => {
	const changeMode = (mode) => {
		const iconLight = document.querySelector('#mode-light');
		const iconDark = document.querySelector('#mode-dark');
		const light = '#f8f9fa';
		const dark = '#212529';
		if (mode === 'dark') {
			document.documentElement.style.setProperty('--dark', light);
			document.documentElement.style.setProperty('--light', dark);
			iconLight.style.display = 'block';
			iconDark.style.display = 'none';
		} else {
			document.documentElement.style.setProperty('--light', light);
			document.documentElement.style.setProperty('--dark', dark);
			iconLight.style.display = 'none';
			iconDark.style.display = 'block';
		}
	};

	const usrMode = localStorage.getItem('usrMode')
		? localStorage.getItem('usrMode')
		: localStorage.setItem('usrMode', 'light');
	changeMode(usrMode);
	document.querySelector('#mode').addEventListener('click', () => {
		localStorage.setItem(
			'usrMode',
			localStorage.getItem('usrMode') === 'light' ? 'dark' : 'light'
		);
		changeMode(localStorage.getItem('usrMode'));
	});
};

// Crida funcions
configTexts();
configMode();
