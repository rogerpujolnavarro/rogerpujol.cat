// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const CoverLetter = () => {
	const { texts } = useContext(DataContext);

	return (
		<>
			{texts && (
				<section>
					<div>{texts.about}</div>
				</section>
			)}
		</>
	);
};

export default CoverLetter;
