import { $, $$ } from './modules/functions.js';

// Recupera plantilles
const getTemplate = async (name) => {
	const templates = document.createElement('template');
	const response = await fetch('templates.html');
	templates.innerHTML = await response.text();
	return $(`#template-${name}`, templates.content).content;
};

// Configuració idioma pàgina
const loadTexts = async () => {
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
		if (!data.length) {
			// Titols
			$('title').textContent = data[lang].titles.title;
			$('#title').textContent = data[lang].titles.title;
			$('#subtitle').textContent = data[lang].titles.subtitle;

			// Menú
			data[lang].titles.menu.forEach(
				(name, id) => ($(`#menu a:nth-child(${id + 1})`).textContent = name)
			);

			// About
			$('#about').innerHTML = data[lang].about;

			// Formació
			$('#education h3').textContent = data[lang].titles.education;
			$('.educations').innerHTML = '';
			data[lang].education
				.sort((ed1, ed2) => ed2.year - ed1.year)
				.map(async (educ) => {
					const temp = await getTemplate('education');
					$('h4', temp).textContent = educ.title;
					$('.school', temp).textContent = educ.school;
					$('a', temp).textContent = educ.link.text;
					$('a', temp).setAttribute('href', educ.link.link);
					$('.date', temp).textContent = educ.year;
					$('.educations').appendChild(temp);
				});

			// Experiència
			$('#experience h3').textContent = data[lang].titles.experience;
			$('.jobs').innerHTML = '';
			data[lang].jobs
				.sort((job1, job2) => job2.dates[0] - job1.dates[0])
				.map(async (job) => {
					const temp = await getTemplate('experience');
					$('h4', temp).textContent = job.title;
					$('a', temp).textContent =
						job.name !== '' ? `${job.name} - ${job.company}` : job.company;
					$('a', temp).setAttribute('href', job.link);
					$('.date', temp).textContent = `${job.dates[0]} - ${job.dates[1]}`;
					job.tasks.map((task) => {
						const li = document.createElement('li');
						li.textContent = task;
						$('ul', temp).appendChild(li);
					});
					$('.jobs').appendChild(temp);
				});

			// Habilitats
			$('#skills h3').textContent = data[lang].titles.skills;
			$('.skills').innerHTML = '';
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
				});

			// Contacte
			$('#contact h3').textContent = data[lang].titles.contact;
			$('#location').textContent = data.contact.location;
			$('#mail').setAttribute('href', `mailto:${data.contact.mail}`);
			$('#mail').textContent = data.contact.mail;
			$('#pdf').setAttribute('href', `cv_${lang}.pdf`);
			$('#pdf').textContent = 'pdf';

			// Peu
			const nav = document.createElement('nav');
			$('footer').innerHTML = '';
			data.contact.social.map((site) => {
				const a = document.createElement('a');
				a.setAttribute('href', site.link);
				a.textContent = site.name;
				nav.appendChild(a);
			});
			$('footer').appendChild(nav);
		}
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
	[...$$('#lang option')].filter((el) => el.value === usrLang)[0].selected = true;

	changeTexts(usrLang);

	$('#lang').addEventListener('change', (e) => {
		localStorage.setItem('userLang', e.target.value);
		changeTexts(e.target.value);
	});
};
// Configuració color pàgina
const configMode = () => {
	const changeMode = (mode) => {
		const iconLight = $('#mode-light');
		const iconDark = $('#mode-dark');
		const light = '#f8f9fa';
		const dark = '#212529';
		if (mode === 'dark') {
			document.documentElement.style.setProperty('--dark', light);
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

// Crida funcions
loadTexts();
configMode();
