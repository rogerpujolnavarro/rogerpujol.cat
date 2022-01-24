import { $, $$ } from './modules/functions.js';

// Recupera plantilles
const getTemplate = async (name) => {
	const templates = document.createElement('template');
	const response = await fetch('templates.html');
	templates.innerHTML = await response.text();
	return $(`#template-${name}`, templates.content).content;
};

// Obté dades arxiu json
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

// Modifica textos segons idioma
const changeTexts = async (lang) => {
	const data = await getData();
	if (!data.length) {
		// Titols
		$('title').textContent = data[lang].titles.title;
		$$('.title').forEach((elem) => (elem.textContent = data[lang].titles.title));
		$$('.subtitle').forEach((elem) => (elem.textContent = data[lang].titles.subtitle));

		// Menú
		data[lang].titles.menu.forEach(
			(name, id) => ($(`#menu a:nth-child(${id + 1})`).textContent = name)
		);

		// About
		$('#about').innerHTML = data[lang].about;

		// Formació
		$('#education h3').textContent = data[lang].titles.education;
		$('.educations').innerHTML = '';
		Promise.all(
			data[lang].education
				.sort((ed1, ed2) => ed2.year - ed1.year)
				.map(async (educ) => {
					const template = await getTemplate('education');
					$('h4', template).textContent = educ.title;
					$('.school', template).textContent = educ.school;
					$('a', template).textContent = educ.link.text;
					$('a', template).setAttribute('href', educ.link.link);
					$('.date', template).textContent = educ.year;
					$('.educations').appendChild(template);
				})
		);

		// Experiència
		$('#experience h3').textContent = data[lang].titles.experience;
		$('.jobs').innerHTML = '';
		Promise.all(
			data[lang].jobs
				.sort((job1, job2) => job2.dates[0] - job1.dates[0])
				.map(async (job) => {
					const template = await getTemplate('experience');
					$('h4', template).textContent = job.title;
					$('a', template).textContent =
						job.name !== '' ? `${job.name} - ${job.company}` : job.company;
					$('a', template).setAttribute('href', job.link);
					$('.date', template).textContent = `${job.dates[0]} - ${job.dates[1]}`;
					job.tasks.map(async (task) => {
						const li = document.createElement('li');
						li.textContent = task;
						await $('ul', template).appendChild(li);
					});
					$('.jobs').appendChild(template);
				})
		);

		// Habilitats
		$('#skills h3').textContent = data[lang].titles.skills;
		$('.skills').innerHTML = '';
		Promise.all(
			data.skills
				.sort(
					(skill1, skill2) =>
						(skill1.skill > skill2.skill) - (skill1.skill < skill2.skill)
				)
				.map(async (skill) => {
					const name = skill.skill;
					const temp = await getTemplate('skills');
					$('label', temp).textContent = name;
					$('label', temp).setAttribute('for', name.toLowerCase().replaceAll(' ', '-'));
					$('progress', temp).setAttribute('id', name.toLowerCase().replaceAll(' ', '-'));
					$('progress', temp).setAttribute('value', skill.value);
					$('.skills').appendChild(temp);
				})
		);

		// Contacte
		$('#contact h3').textContent = data[lang].titles.contact;
		$('#location').textContent = data.contact.location;
		$('#mail').setAttribute('href', `mailto:${data.contact.mail}`);
		$('#mail').textContent = data.contact.mail;
		$('#pdf').setAttribute('href', `pdf/cv_${lang}.pdf`);
		$('#pdf').textContent = 'pdf';

		// Peu
		const nav = document.createElement('nav');
		$('footer').innerHTML = '';
		data.contact.social.map((site) => {
			const a = document.createElement('a');
			a.setAttribute('target', '_blank');
			a.setAttribute('href', site.link);
			a.textContent = site.name;
			nav.appendChild(a);
		});
		$('footer').appendChild(nav);
	}
};

// Configuració idioma pàgina
const loadTexts = async () => {
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
	[...$$('#lang option')].filter((el) => el.value === usrLang)[0].selected = true;

	changeTexts(usrLang);

	$('#lang').addEventListener('change', (e) => {
		localStorage.setItem('userLang', e.target.value);
		changeTexts(e.target.value);
	});
};

// Canvi variables colors
const changeMode = (mode) => {
	const iconLight = $('#mode-light');
	const iconDark = $('#mode-dark');
	const light = '#f8f9fa';
	const dark = '#212529';
	if (mode === 'dark') {
		document.documentElement.style.setProperty('--dark', `${light}dd`);
		document.documentElement.style.setProperty('--light', `${dark}dd`);
		iconLight.style.display = 'block';
		iconDark.style.display = 'none';
	} else {
		document.documentElement.style.setProperty('--light', light);
		document.documentElement.style.setProperty('--dark', dark);
		iconLight.style.display = 'none';
		iconDark.style.display = 'block';
	}
};

// Configuració color pàgina
const configMode = () => {
	const usrMode = localStorage.getItem('usrMode')
		? localStorage.getItem('usrMode')
		: localStorage.setItem('usrMode', 'light');
	changeMode(usrMode);
	$('#mode').addEventListener('click', () => {
		localStorage.setItem(
			'usrMode',
			localStorage.getItem('usrMode') === 'light' ? 'dark' : 'light'
		);
		changeMode(localStorage.getItem('usrMode'));
	});
};

// Configuració color principal
const configColor = () => {
	const rndColor = (colors) => {
		return colors[Math.floor(Math.random() * colors.length)];
	};
	const colors = ['#e79e4f', '#0077b6', '#e9c46a', '#2a9d8f', '#ff9aa2', '#e5383b', '#73a942'];
	localStorage.getItem('usrColor')
		? localStorage.getItem('usrColor')
		: localStorage.setItem('usrColor', rndColor(colors));
	let usrColor = localStorage.getItem('usrColor');
	document.documentElement.style.setProperty('--primary', usrColor);
	$('#color').addEventListener('click', () => {
		localStorage.setItem('usrColor', rndColor(colors.filter((color) => color !== usrColor)));
		usrColor = localStorage.getItem('usrColor');
		document.documentElement.style.setProperty('--primary', usrColor);
	});
};

// Amaga-ensenya menú
const showMenu = () => {
	$('#show-menu').addEventListener('click', () => {
		$('#show-menu').style.display = 'none';
		$('#close-menu').style.display = 'block';

		$$('header div').forEach((el) => (el.style.display = 'block'));
	});
	$('#close-menu').addEventListener('click', () => {
		$('#show-menu').style.display = 'block';
		$('#close-menu').style.display = 'none';

		$$('header div').forEach((el) => (el.style.display = el.removeAttribute('style')));
	});
};

// Crida funcions
loadTexts();
configMode();
configColor();
showMenu();
