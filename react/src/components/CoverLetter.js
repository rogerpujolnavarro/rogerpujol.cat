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
					<div>
						{texts.about.map((paragraph, index) => (
							<p key={index}>{paragraph}</p>
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default CoverLetter;
