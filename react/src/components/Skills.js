// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Skills = () => {
	const { skills, texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[4]}>
					<h3>{texts.titles.menu[4]}</h3>
					<div className="skills">
						{skills.map((skill) => (
							<span key={skill.skill}>{skill.skill}</span>
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default Skills;
