// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Footer = () => {
	const { contact } = useContext(DataContext);

	return (
		<footer>
			<nav>
				{contact &&
					contact.links.map((link, index) => (
						<a key={index} href={link.link} target="_blank" rel="noreferrer">
							{link.name}
						</a>
					))}
			</nav>
		</footer>
	);
};

export default Footer;
