import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

interface SiteHeaderProps {
  navItems?: NavItem[];
  brandHref?: string;
  brandLabel?: string;
}

const SiteHeader = ({
  navItems = [],
  brandHref = '/',
  brandLabel = 'Jameson Zeller'
}: SiteHeaderProps) => {
  const renderBrand = () => {
    if (brandHref.startsWith('#')) {
      return (
        <a className="brand" href={brandHref}>
          {brandLabel}
        </a>
      );
    }

    return (
      <Link className="brand" to={brandHref}>
        {brandLabel}
      </Link>
    );
  };

  const renderNavLink = (item: NavItem) => {
    if (item.external) {
      return (
        <a
          key={item.label}
          className="nav-link"
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {item.label}
        </a>
      );
    }

    if (item.href.startsWith('#')) {
      return (
        <a key={item.label} className="nav-link" href={item.href}>
          {item.label}
        </a>
      );
    }

    return (
      <Link key={item.label} className="nav-link" to={item.href}>
        {item.label}
      </Link>
    );
  };

  return (
    <header className="site-header">
      {renderBrand()}
      {navItems.length > 0 && <nav className="header-nav">{navItems.map(renderNavLink)}</nav>}
      <ThemeToggle />
    </header>
  );
};

export default SiteHeader;
