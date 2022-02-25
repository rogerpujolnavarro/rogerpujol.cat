// react
import { useState } from 'react';
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
import SettingsContext from './contexts/SettingsContext';
// defaults
import { getLocal } from './defaults/functions';

function App() {
	const [language, setLanguage] = useState(getLocal('language') ? getLocal('language') : 'ca');
	const [mode, setMode] = useState(
		getLocal('mode') ? getLocal('mode') : { dark: true, color: '#2a9d8f' }
	);

	const changeLanguage = (newLanguage) => {
		setLanguage(newLanguage);
	};
	const changeMode = (newMode) => {
		setMode(newMode);
	};

	return (
		<SettingsContext.Provider
			value={{
				language: language,
				mode: mode,
				onChangeLanguage: changeLanguage,
				onChangeMode: changeMode,
			}}
		>
			<Header />
			<CoverLetter />
			<Education />
			<Experience />
			<Skills />
			<Portfolio />
			<Contact />
			<Footer />
		</SettingsContext.Provider>
	);
}

export default App;
