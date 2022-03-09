const ExperienceCard = ({ company, dates, link, name, tasks, title }) => {
	return (
		<div className="job">
			<a href={link} target="_blank" rel="noreferrer">
				{name !== '' ? `${name} - ${company}` : company}
			</a>
			<h4>{title}</h4>
			<span className="date">
				{dates[0]} - {dates[1]}
			</span>
			<ul>
				{tasks.map((task, index) => (
					<li key={index}>{task}</li>
				))}
			</ul>
		</div>
	);
};

export default ExperienceCard;
