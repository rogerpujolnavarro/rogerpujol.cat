// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Portfolio = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[3]}>
					<h3>{texts.titles.menu[3]}</h3>
				</section>
			)}
		</>
	);
};

export default Portfolio;
