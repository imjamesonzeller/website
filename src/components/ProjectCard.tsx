import { Link } from 'react-router-dom';
import type { Project, ProjectAction } from '../types/projects';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const renderAction = (action: ProjectAction) => {
    if (action.kind === 'button') {
      const variant = action.variant ?? 'primary';
      const className = `btn ${variant} small`;

      if (action.external) {
        return (
          <a
            key={action.label}
            className={className}
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {action.label}
          </a>
        );
      }

      if (action.href.startsWith('#')) {
        return (
          <a key={action.label} className={className} href={action.href}>
            {action.label}
          </a>
        );
      }

      return (
        <Link key={action.label} className={className} to={action.href}>
          {action.label}
        </Link>
      );
    }

    if (action.external) {
      return (
        <a
          key={action.label}
          className="inline-link"
          href={action.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {action.label}
        </a>
      );
    }

    if (action.href.startsWith('#')) {
      return (
        <a key={action.label} className="inline-link" href={action.href}>
          {action.label}
        </a>
      );
    }

    return (
      <Link key={action.label} className="inline-link" to={action.href}>
        {action.label}
      </Link>
    );
  };

  return (
    <article className="project-card">
      <p className="project-type">{project.type}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <ul className="project-tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <div className="project-actions">{project.actions.map(renderAction)}</div>
    </article>
  );
};

export default ProjectCard;
