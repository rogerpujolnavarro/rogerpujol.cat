// react
import { useContext } from 'react';
// components
import ExperienceCard from './ExperienceCard';
// contexts
import DataContext from '../contexts/DataContext';

const Experience = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[2]}>
					<h3>{texts.titles.menu[2]}</h3>
					<div className="jobs">
						{texts.jobs.map(({ company, dates, link, name, tasks, title }, index) => (
							<ExperienceCard
								key={index}
								company={company}
								dates={dates}
								link={link}
								name={name}
								tasks={tasks}
								title={title}
							/>
						))}
					</div>
				</section>
			)}
		</>
	);
};

export default Experience;
