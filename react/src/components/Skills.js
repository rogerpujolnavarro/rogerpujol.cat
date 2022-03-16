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
						{skills.map((skill, index) => (
							<div key={`div-${index}`} className="skill">
								<label key={`label-${index}`} htmlFor={skill.skill}>
									{skill.skill}
								</label>
								<progress
									key={`progress-${index}`}
									id={skill.skill}
									value={skill.value}
									max="100"
								></progress>
							</div>
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default Skills;
