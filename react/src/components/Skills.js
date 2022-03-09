// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Skills = () => {
	const { skills, texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[3]}>
					<h3>{texts.titles.menu[3]}</h3>
					{skills && skills.map((skill, index) => <span key={index}>{skill.skill}</span>)}
				</section>
			)}
		</>
	);
};

export default Skills;
