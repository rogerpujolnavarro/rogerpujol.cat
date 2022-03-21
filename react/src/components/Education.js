// react
import { useContext } from 'react';
// contexts
import DataContext from '../contexts/DataContext';

const Education = () => {
	const { texts } = useContext(DataContext);
	return (
		<>
			{texts && (
				<section id={texts.titles.menu[1]}>
					<h3>{texts.titles.menu[1]}</h3>
					{texts.education
						.sort((course1, course2) => course2.year - course1.year)
						.map((course, index) => (
							<div key={`p-${index}`} className="education">
								<h4>{course.title}</h4>
								<span key={`span-${index}`}>{course.school}</span> (
								<a
									key={`a-${index}`}
									href={course.link.link}
									target="_blank"
									rel="noreferrer"
								>
									{course.link.text}
								</a>
								) - <span>{course.year}</span>
							</div>
						))}
				</section>
			)}
		</>
	);
};

export default Education;
