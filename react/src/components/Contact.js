// react
import { useContext } from 'react';
import { FiDownload, FiMail, FiMapPin } from 'react-icons/fi';
// contexts
import DataContext from '../contexts/DataContext';
import SettingsContext from '../contexts/SettingsContext';

const Contact = () => {
	const { texts, contact } = useContext(DataContext);
	const { language } = useContext(SettingsContext);

	return (
		<>
			{texts && (
				<section id={texts.titles.menu[5]}>
					<h3>{texts.titles.menu[5]}</h3>
					<div className="info">
						<span>
							<FiMapPin />
							<a
								href="https://goo.gl/maps/GWAL3Gpnj6UGXJsQ8"
								target="_blank"
								rel="noreferrer"
							>
								{contact.location}
							</a>
						</span>
						<span>
							<FiMail />
							<a href={`mailto:${contact.mail}`} target="_blank" rel="noreferrer">
								{contact.mail}
							</a>
						</span>
						<span>
							<FiDownload />
							<a href={`/pdf/cv_${language}.pdf`} target="_blank" rel="noreferrer">
								pdf
							</a>
						</span>
					</div>
				</section>
			)}
		</>
	);
};

export default Contact;
