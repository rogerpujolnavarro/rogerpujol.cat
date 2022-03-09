// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const CoverLetter = () => {
	const { texts } = useContext(DataContext);

	return <section>{texts && texts.about}</section>;
};

export default CoverLetter;
