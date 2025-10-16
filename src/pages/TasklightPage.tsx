import SiteHeader from '../components/SiteHeader';
import '../styles/tasklight.css';

const navItems = [
  { label: 'Watch the Demo', href: '#watch' },
  { label: 'Getting Started', href: '#setup' },
  { label: 'Support', href: '#support' }
];

const TasklightPage = () => {
  return (
    <>
      <SiteHeader navItems={navItems} brandHref="/#projects" brandLabel="← Jameson Zeller" />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">Productivity App</p>
            <h1>Tasklight</h1>
            <p className="tagline">
              Capture tasks at the speed of thought. Summon a Spotlight-style input, type in natural
              language, and send structured tasks straight to Notion.
            </p>
            <div className="cta-group">
              <a
                className="btn primary"
                href="https://github.com/imjamesonzeller/tasklight-v3/releases/latest"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for macOS
              </a>
              <a
                className="btn secondary"
                href="https://github.com/imjamesonzeller/tasklight-v3"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            <p className="disclaimer">Signed universal build for macOS 12+ · Apple Silicon & Intel</p>
          </div>
          <div className="hero-highlights">
            <div className="highlight">
              <h3>Global Hotkey</h3>
              <p>Hit your shortcut anywhere to log a task without breaking your flow.</p>
            </div>
            <div className="highlight">
              <h3>Natural Language</h3>
              <p>Write &ldquo;Finish proposal by Friday 3pm&rdquo; and Tasklight structures it automatically.</p>
            </div>
            <div className="highlight">
              <h3>Notion Native</h3>
              <p>Use OAuth to connect Tasklight to your Notion workspace in seconds.</p>
            </div>
          </div>
        </section>

        <section className="notice">
          <h2>AI Parsing Status</h2>
          <p>
            Tasklight&apos;s AI-powered natural language parsing is temporarily paused while the new Bring
            Your Own Key system is finalized. You can still capture tasks instantly&mdash;AI support will
            return in an upcoming update.
          </p>
        </section>

        <section className="media" id="watch">
          <div className="section-heading">
            <h2>See Tasklight in Action</h2>
            <p className="section-subtitle">
              Take a quick look at the current interface, hotkey-driven workflow, and Notion integration.
            </p>
          </div>
          <div className="video-frame">
            <iframe
              src="https://www.youtube.com/embed/0FS4a6uXHdc"
              title="Tasklight Walkthrough"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        <section className="feature-grid">
          <h2>Why Tasklight</h2>
          <div className="grid">
            <article className="feature-card">
              <h3>Spotlight-Like UI</h3>
              <p>
                A distraction-free input window appears instantly on top of your workspace with subtle
                animations and keyboard-first navigation.
              </p>
            </article>
            <article className="feature-card">
              <h3>Secure by Design</h3>
              <p>
                Secrets, OAuth tokens, and BYOK credentials live in the Apple Keychain&mdash;no cloud
                storage or logging.
              </p>
            </article>
            <article className="feature-card">
              <h3>Configurable Hotkeys</h3>
              <p>
                Pick the shortcut that fits your muscle memory and adjust input behavior right inside
                Tasklight&apos;s settings window.
              </p>
            </article>
            <article className="feature-card">
              <h3>Notion-Ready Tasks</h3>
              <p>
                Select your target database, date fields, and properties once&mdash;Tasklight remembers
                everything for fast capture.
              </p>
            </article>
            <article className="feature-card">
              <h3>Keyboard-Driven Workflow</h3>
              <p>
                Invoke Tasklight, type, press <kbd>Enter</kbd> to submit, or <kbd>Esc</kbd> to hide. Your
                focus stays on the work that matters.
              </p>
            </article>
            <article className="feature-card">
              <h3>Open Source</h3>
              <p>
                Inspect the code, contribute features, or fork your own version. Tasklight is built with
                Go, React, and Wails v3.
              </p>
            </article>
          </div>
        </section>

        <section className="setup" id="setup">
          <h2>Getting Started</h2>
          <ol className="steps">
            <li>
              Download the latest universal <code>.dmg</code>, drag <strong>Tasklight.app</strong> into
              <code>/Applications</code>, and launch it once.
            </li>
            <li>Grant Accessibility access when prompted so the global hotkey can run anywhere.</li>
            <li>
              Open the settings window with <kbd>⌘</kbd> <kbd>,</kbd> to connect your Notion workspace
              via OAuth.
            </li>
            <li>
              (Optional) Enable Bring Your Own Key and store your OpenAI key securely for AI-powered
              parsing.
            </li>
            <li>
              Choose your database, configure the date property, and set the perfect shortcut. You&apos;re
              ready to capture.
            </li>
          </ol>
        </section>

        <section className="requirements">
          <h2>System Requirements</h2>
          <ul>
            <li>macOS 12 Monterey or newer (Apple Silicon &amp; Intel supported)</li>
            <li>Active Notion account with access to a target database</li>
            <li>Accessibility permission for Tasklight to listen for the global hotkey</li>
            <li>Internet connection for Notion OAuth and optional AI parsing</li>
          </ul>
        </section>

        <section className="roadmap">
          <h2>What&apos;s Next</h2>
          <div className="grid">
            <article className="feature-card">
              <h3>Bring Your Own Key tiers</h3>
              <p>
                Flexible limits and billing for AI-powered parsing&mdash;use your own OpenAI key or
                Tasklight-hosted quotas.
              </p>
            </article>
            <article className="feature-card">
              <h3>Recurring Tasks &amp; Smart Tags</h3>
              <p>Create structured schedules from a single sentence with automatic metadata detection.</p>
            </article>
            <article className="feature-card">
              <h3>Cross-Platform Support</h3>
              <p>
                Windows and Linux builds are in development so you can keep Tasklight in your flow
                everywhere.
              </p>
            </article>
          </div>
        </section>

        <section className="support" id="support">
          <h2>Need a Hand?</h2>
          <p>Have feedback, found a bug, or want to request a feature? I&apos;d love to hear from you.</p>
          <div className="support-actions">
            <a
              className="btn secondary"
              href="https://jamesonzeller.com/tasklight/bugs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Report a Bug
            </a>
            <a
              className="btn secondary"
              href="https://jamesonzeller.com/tasklight/feature-request"
              target="_blank"
              rel="noopener noreferrer"
            >
              Request a Feature
            </a>
            <a className="btn secondary" href="mailto:jz@jamesonzeller.com">
              Contact Support
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          Built by Jameson Zeller ·{' '}
          <a
            href="https://github.com/imjamesonzeller/tasklight-v3"
            target="_blank"
            rel="noopener noreferrer"
          >
            Source on GitHub
          </a>
        </p>
      </footer>
    </>
  );
};

export default TasklightPage;
