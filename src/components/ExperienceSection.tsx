interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  location: string;
  highlights: string[];
}

interface EducationItem {
  school: string;
  degree: string;
  minor?: string;
  startDate: string;
  endDate: string;
  location: string;
  details: string;
}

interface ExperienceSectionProps {
  education: EducationItem[];
  experience: ExperienceItem[];
}

const ExperienceSection = ({ education, experience }: ExperienceSectionProps) => {
  return (
    <section className="experience" id="experience">
      <div className="section-heading">
        <h2>Experience</h2>
        <p className="section-subtitle">
          My background in full-stack development, product, and teaching.
        </p>
      </div>

      <div className="experience-content">
        <div className="experience-subsection">
          <h3 className="subsection-title">Education</h3>
          <div className="timeline">
            {education.map((edu, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h4>{edu.degree}</h4>
                    <span className="timeline-date">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="timeline-school">{edu.school}</p>
                  {edu.minor && <p className="timeline-minor">Minor in {edu.minor}</p>}
                  <p className="timeline-location">{edu.location}</p>
                  <p className="timeline-details">{edu.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="experience-subsection">
          <h3 className="subsection-title">Work</h3>
          <div className="timeline">
            {experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <div>
                      <h4>{exp.role}</h4>
                      <p className="timeline-company">{exp.company}</p>
                    </div>
                    <span className="timeline-date">{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <p className="timeline-location">{exp.location}</p>
                  {exp.highlights.length > 0 && (
                    <ul className="experience-highlights">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i}>{highlight}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
