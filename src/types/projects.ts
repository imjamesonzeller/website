export type ProjectActionKind = 'button' | 'link';

export type ButtonVariant = 'primary' | 'secondary';

export interface ProjectAction {
  label: string;
  href: string;
  kind: ProjectActionKind;
  variant?: ButtonVariant;
  external?: boolean;
}

export interface Project {
  id: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
  actions: ProjectAction[];
}
