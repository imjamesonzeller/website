import { useMemo } from 'react';
import SiteHeader from '../components/SiteHeader';
import ProjectCard from '../components/ProjectCard';
import ExperienceSection from '../components/ExperienceSection';
import { useCurrentRead } from '../hooks/useCurrentRead';
import { useRotatingContent } from '../hooks/useRotatingContent';
import projectsRaw from '../data/projects.json';
import wordsRaw from '../data/words.json';
import imagesRaw from '../data/imagelist.json';
import type { Project } from '../types/projects';
import '../styles/home.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' }
];

const projects = projectsRaw as Project[];
const words = (wordsRaw as string[]).length > 0 ? (wordsRaw as string[]) : ['hiking'];
const images = (imagesRaw as string[]).length > 0 ? (imagesRaw as string[]) : ['/images/jameson-headshot.jpg'];

const education = [
  {
    school: 'University of Illinois at Urbana-Champaign',
    degree: 'Bachelor of Science in Mathematics & Computer Science',
    minor: 'Minor in Business',
    startDate: 'Aug. 2024',
    endDate: 'May 2028',
    location: 'Champaign, Illinois',
    details: '3.87 GPA • Elsie Thomas Fraser Award Winner • Dean\'s List'
  },
  {
    school: 'Grant Community High School',
    degree: 'High School Diploma',
    startDate: 'Graduated',
    endDate: '2024',
    location: 'Fox Lake, Illinois',
    details: '4.55 GPA • Baseball Team Captain • Math Team Oralist'
  }
];

const workExperience = [
  {
    company: 'Hudl',
    role: 'Software Engineering Intern',
    startDate: 'May 2026',
    endDate: 'Aug. 2026',
    location: 'Lincoln, NE',
    highlights: ['Working with C#, .NET, and React']
  },
  {
    company: 'AthXcel (acquired by Optima Sports Group)',
    role: 'Product Manager',
    startDate: 'May 2025',
    endDate: 'Present',
    location: 'Remote / Round Lake, IL',
    highlights: [
      'Architected and deployed "Coach Eddie" AI Chat system with C# .NET backend and TypeScript React frontend',
      'Designed and implemented tool call handler and registry framework for type-safe function routing with OpenAI',
      'Engineered full-stack solution with SQL Server schemas, conversation management, and Azure deployment',
      'Led cross-company integration efforts post-acquisition, coordinating engineering teams'
    ]
  },
  {
    company: 'Siebel School of Computing and Data Science',
    role: 'CS 124 Tutor (Java / Kotlin)',
    startDate: 'Jan. 2025',
    endDate: 'Dec. 2025',
    location: 'Champaign, IL',
    highlights: ['Mentored students in UIUC\'s CS 124 programming course, simplifying complex design and debugging concepts']
  }
];

const HomePage = () => {
  const { title: currentRead } = useCurrentRead();

  const { item: currentWord, isVisible: isWordVisible } = useRotatingContent(words);
  const { item: currentImage, isVisible: isImageVisible } = useRotatingContent(images);

  const headshotClassName = useMemo(
    () => `fade-element${isImageVisible ? ' is-visible' : ''}`,
    [isImageVisible]
  );

  const wordClassName = useMemo(
    () => `fade-element${isWordVisible ? ' is-visible' : ''}`,
    [isWordVisible]
  );

  return (
    <>
      <SiteHeader navItems={navItems} />

      <main>
        <section className="hero" id="about">
          <div className="hero-copy">
            <p className="eyebrow">Student · Builder · Teammate</p>
            <h1>Hi, I&apos;m Jameson Zeller.</h1>
            <p className="lead">
              I&apos;m a CS and Math student at UIUC who likes building things that people use.
              Based in Champaign, working on tools that make people&apos;s work easier.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="mailto:jz@jamesonzeller.com">
                Get in touch
              </a>
              <a
                className="btn secondary"
                href="https://github.com/imjamesonzeller/resume-repo/releases/latest/download/UIUC-CS-zeller-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download resume
              </a>
            </div>
            <ul className="hero-meta">
              <li>
                <span className="meta-label">Focus:</span> Full-stack development, APIs, and connecting
                the pieces.
              </li>
              <li>
                <span className="meta-label">Currently reading:</span> {currentRead}
              </li>
              <li>
                <span className="meta-label">When I log off:</span> I&apos;m usually{' '}
                <span className={wordClassName}>{currentWord}</span>.
              </li>
            </ul>
            <div className="link-row">
              <a
                className="inline-link"
                href="https://www.linkedin.com/in/jameson-zeller"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="inline-link"
                href="https://github.com/imjamesonzeller"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="portrait-frame">
              <img
                className={headshotClassName}
                src={currentImage}
                alt="Portrait of Jameson Zeller"
                id="headshot"
              />
            </div>
          </div>
        </section>

        <section className="feature-band">
          <div className="feature-card">
            <h2>What I&apos;m great at</h2>
            <p>Designing humane, highly responsive software experiences with strong attention to polish.</p>
          </div>
          <div className="feature-card">
            <h2>How I work</h2>
            <p>
              Collaborative, curious, and relentlessly iterative—shaping rough concepts into
              production-ready tools.
            </p>
          </div>
          <div className="feature-card">
            <h2>Where I thrive</h2>
            <p>
              End-to-end projects that blend backend systems, APIs, and front-end craft to solve real
              workflows.
            </p>
          </div>
        </section>

        <ExperienceSection education={education} experience={workExperience} />

        <section className="projects" id="projects">
          <div className="section-heading">
            <h2>Recent Projects</h2>
            <p className="section-subtitle">
              A sampling of the products and experiments I&apos;m excited about right now.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-links">
          <a className="inline-link" href="mailto:jz@jamesonzeller.com">
            jz@jamesonzeller.com
          </a>
          <a
            className="inline-link"
            href="https://www.linkedin.com/in/jameson-zeller"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="inline-link"
            href="https://github.com/imjamesonzeller"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <p>© Jameson Anthony Zeller. Built with care in Champaign, IL.</p>
      </footer>
    </>
  );
};

export default HomePage;
