import { useMemo } from 'react';
import SiteHeader from '../components/SiteHeader';
import ProjectCard from '../components/ProjectCard';
import { useCurrentRead } from '../hooks/useCurrentRead';
import { useRotatingContent } from '../hooks/useRotatingContent';
import projectsRaw from '../data/projects.json';
import wordsRaw from '../data/words.json';
import imagesRaw from '../data/imagelist.json';
import type { Project } from '../types/projects';
import '../styles/home.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' }
];

const projects = projectsRaw as Project[];
const words = (wordsRaw as string[]).length > 0 ? (wordsRaw as string[]) : ['hiking'];
const images = (imagesRaw as string[]).length > 0 ? (imagesRaw as string[]) : ['/images/jameson-headshot.jpg'];

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
              I translate ideas into shippable software and mathematical insight. Based in Champaign,
              Illinois, I&apos;m currently studying Computer Science and Mathematics while building
              tools that help teams move faster.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="mailto:jz@jamesonzeller.com">
                Let&apos;s collaborate
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
                <span className="meta-label">Focus:</span> Systems integration, product engineering,
                and data-driven tooling.
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

        <section className="callout">
          <h2>Let&apos;s build something useful together.</h2>
          <p>
            I love partnering with teams to streamline workflows, explore applied AI, and deliver
            delightful product moments.
          </p>
          <div className="callout-actions">
            <a className="btn primary" href="mailto:jz@jamesonzeller.com">
              Start a conversation
            </a>
            <a
              className="btn secondary"
              href="https://cal.com/jamesonzeller"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a time
            </a>
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
