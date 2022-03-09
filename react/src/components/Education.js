// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Education = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[1]}>
					<h3>{texts.titles.menu[1]}</h3>
				</section>
			)}
		</>
	);
};

export default Education;
