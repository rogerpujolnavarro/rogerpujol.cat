// react
import { useState, useEffect } from 'react';
// components
import Contact from './components/Contact';
import CoverLetter from './components/CoverLetter';
import Education from './components/Education';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
// contexts
import DataContext from './contexts/DataContext';
import SettingsContext from './contexts/SettingsContext';
// defaults
import { getLocal, saveLocal, setDocumentColor } from './defaults/functions';
import { colors, dark, light } from './defaults/parameters';
// firebase
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

function App() {
	// states
	const [language, setLanguage] = useState(getLocal('language') ? getLocal('language') : 'ca');
	const [mode, setMode] = useState('');

	// page configuration
	const changeLanguage = (ev) => {
		const newLanguage = ev.target.value;
		saveLocal('language', newLanguage);
		setLanguage(newLanguage);
	};
	const changeMode = (newMode) => {
		if (newMode.dark) {
			setDocumentColor('dark', `${light}dd`);
			setDocumentColor('light', `${dark}dd`);
		} else {
			setDocumentColor('light', light);
			setDocumentColor('dark', dark);
		}
		setDocumentColor('primary', newMode.color);
		saveLocal('mode', newMode);
		setMode(newMode);
	};
	useEffect(() => {
		changeMode(getLocal('mode') ? getLocal('mode') : { dark: true, color: colors[0] });
	}, []);

	// data from firebase
	const [bbdd, setBbdd] = useState('');
	useEffect(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyB6aHCipYl4xkrArFseQ1HH_cRDY67kYJs',
			authDomain: 'rogerpujol-126ed.firebaseapp.com',
			databaseURL: 'https://rogerpujol-126ed-default-rtdb.europe-west1.firebasedatabase.app',
			projectId: 'rogerpujol-126ed',
			storageBucket: 'rogerpujol-126ed.appspot.com',
			messagingSenderId: '1091785423114',
			appId: '1:1091785423114:web:05dc45f17e05e95736a2f3',
			measurementId: 'G-N0BQ1VN6KB',
		};
		const app = initializeApp(firebaseConfig);
		const dataBBDD = ref(getDatabase(app), 'data');
		onValue(dataBBDD, (snapshot) => {
			const data = snapshot.val();
			setBbdd(data);
		});
	}, []);

	useEffect(() => {
		console.log(bbdd);
	}, [bbdd]);

	return (
		<DataContext.Provider
			value={{
				contact: bbdd.contact,
				skills: bbdd.skills,
				texts: bbdd[language],
			}}
		>
			<SettingsContext.Provider
				value={{
					language: language,
					mode: mode,
					onChangeLanguage: changeLanguage,
					onChangeMode: changeMode,
				}}
			>
				<Header />
				<main>
					<CoverLetter />
					<hr />
					<Education />
					<hr />
					<Experience />
					<hr />
					<Portfolio />
					<hr />
					<Skills />
					<hr />
					<Contact />
				</main>
				<Footer />
			</SettingsContext.Provider>
		</DataContext.Provider>
	);
}

export default App;
