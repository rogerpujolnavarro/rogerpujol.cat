// react
import { useContext } from 'react';
import { FiAperture, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';
// contexts
import DataContext from '../contexts/DataContext';
import SettingsContext from '../contexts/SettingsContext';
// defaults
import { colors } from '../defaults/parameters';

const Header = () => {
	const { texts } = useContext(DataContext);
	const { language, mode, showMenuBar, onChangeLanguage, onChangeMode, onChangeMenuBar } =
		useContext(SettingsContext);

	const rndColor = (colors) => {
		return colors[Math.floor(Math.random() * colors.length)];
	};

	return (
		<>
			{texts && (
				<header className={showMenuBar ? 'show' : ''}>
					<div>
						<select onInput={onChangeLanguage} defaultValue={language}>
							<option value="ca">ca</option>
							<option value="en">en</option>
							<option value="es">es</option>
						</select>
						{mode.dark ? (
							<FiSun
								onClick={() => onChangeMode({ dark: false, color: mode.color })}
								className="button-icon"
							/>
						) : (
							<FiMoon
								onClick={() => onChangeMode({ dark: true, color: mode.color })}
								className="button-icon"
							/>
						)}
						<FiAperture
							onClick={() =>
								onChangeMode({
									dark: mode.dark,
									color: rndColor(colors.filter((color) => color !== mode.color)),
								})
							}
							className="button-icon"
						/>
					</div>

					<div className="title">
						<h1>{texts.titles.title}</h1>
						<h3>{texts.titles.subtitle}</h3>
					</div>
					<nav>
						{texts.titles.menu.map((navItem, index) => (
							<a key={index} href={`#${index !== 0 ? navItem : ''}`}>
								{navItem}
							</a>
						))}
					</nav>
					<div className="navbar-toggler-icon">
						{showMenuBar ? (
							<FiX onClick={onChangeMenuBar} />
						) : (
							<FiMenu onClick={onChangeMenuBar} />
						)}
					</div>
				</header>
			)}
		</>
	);
};

export default Header;
