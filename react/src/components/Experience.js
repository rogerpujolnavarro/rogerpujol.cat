// react
import { useContext } from 'react';
// components
import ExperienceCard from './ExperienceCard';
// contexts
import DataContext from '../contexts/DataContext';

const Experience = () => {
	const { texts } = useContext(DataContext);
	return (
		<section>
			<div className="jobs">
				{texts &&
					texts.jobs.map(({ company, dates, link, name, tasks, title }, index) => (
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
	);
};

export default Experience;
