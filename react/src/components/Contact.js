// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Contact = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[4]}>
					<h3>{texts.titles.menu[4]}</h3>
				</section>
			)}
		</>
	);
};

export default Contact;
