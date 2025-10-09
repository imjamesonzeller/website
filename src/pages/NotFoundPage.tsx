import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import '../styles/home.css';

const NotFoundPage = () => (
  <>
    <SiteHeader brandHref="/" />
    <main style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 20px' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>Page not found</h1>
      <p style={{ color: 'var(--muted-text)', marginBottom: '32px' }}>
        Sorry, the page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the
        projects.
      </p>
      <Link className="btn primary" to="/">
        Go home
      </Link>
    </main>
  </>
);

export default NotFoundPage;
