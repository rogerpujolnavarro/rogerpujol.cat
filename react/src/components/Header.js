// react
import { useContext } from 'react';
import { FiAperture, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi';

// contexts
import DataContext from '../contexts/DataContext';
const Header = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<header>
					<div>
						<select name="lang" id="lang">
							<option value="ca">ca</option>
							<option value="en">en</option>
							<option value="es">es</option>
						</select>
						<FiSun />
						<FiMoon />
						<FiAperture />
					</div>

					<div>
						<h1>{texts.titles.title}</h1>
						<h3>{texts.titles.subtitle}</h3>
					</div>
					<div>
						<nav>
							{texts.titles.menu.map((navItem, index) => (
								<a key={index} href={`#${index !== 0 ? navItem : ''}`}>
									{navItem}
								</a>
							))}
						</nav>
					</div>
					<FiMenu />
					<FiX />
				</header>
			)}
		</>
	);
};

export default Header;
