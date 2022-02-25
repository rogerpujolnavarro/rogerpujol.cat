// react
import { useState } from 'react';
// components
import Footer from './components/Footer';
import Header from './components/Header';
import Section from './components/Section';
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
			<Section />
			<Footer />
		</SettingsContext.Provider>
	);
}

export default App;
