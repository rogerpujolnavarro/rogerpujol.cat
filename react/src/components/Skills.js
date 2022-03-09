// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Skills = () => {
	const { skills } = useContext(DataContext);
	return (
		<section>
			{skills && skills.map((skill, index) => <span key={index}>{skill.skill}</span>)}
		</section>
	);
};

export default Skills;
