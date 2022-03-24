// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Portfolio = () => {
	const { texts } = useContext(DataContext);

	return (
		<>
			{texts && (
				<section id={texts.titles.menu[3]}>
					<h3>{texts.titles.menu[3]}</h3>
					<div className="projects">
						{texts.projects
							.sort((project1, project2) => project1.id - project2.id)
							.map((project) => (
								<div
									key={`div-${project.id}`}
									className="project"
									onClick={() => {
										window.open(project.link, '_blank');
									}}
								>
									<img
										src={require(`../img/${project.name.replaceAll(
											' ',
											''
										)}.png`)}
										alt={project.name}
									></img>
									<div>
										<h4 key={`title-${project.id}`}>{project.name}</h4>
										<span key={`span-${project.id}`}>
											{project.description}
										</span>
									</div>
								</div>
							))}
					</div>
				</section>
			)}
		</>
	);
};

export default Portfolio;
