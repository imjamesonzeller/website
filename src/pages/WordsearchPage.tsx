import { FormEvent, useMemo, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import { WordSearchPayload, WordSearchResponse } from '../types/api';
import '../styles/wordsearch.css';

const navItems = [
  { label: 'Generator', href: '#generator' },
  { label: 'Tips', href: '#tips' },
  { label: 'Support', href: '#support' }
];

const API_ENDPOINT = 'https://api.jamesonzeller.com/generate_word_search';
const SAMPLE_GRID_LINES = ['S R C H S W O R D', 'A O P U Z Z L E R', 'R L E A R N I N G', 'E V A D E C O D E'];

function buildCsv(grid: string[][] | undefined, words: string[] | undefined) {
  const rows = grid?.map((row) => row.join(',')).join('\n') ?? '';
  const wordsRow = words?.length ? `Words:,${words.join(',')}\n` : '';
  return `${rows}${rows && '\n'}${wordsRow}`.trim();
}

const WordsearchPage = () => {
  const [delimiter, setDelimiter] = useState<string>('');
  const [inputText, setInputText] = useState<string>('');
  const [gridLines, setGridLines] = useState<string[]>([]);
  const [wordList, setWordList] = useState<string[]>([]);
  const [downloadHref, setDownloadHref] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedText = inputText.trim();
    const rawDelimiter = delimiter.trim() || '\\s+';

    let delimiterRegex: RegExp;
    try {
      delimiterRegex = new RegExp(rawDelimiter);
    } catch {
      setError('Please provide a valid delimiter. Try "," or "\\n".');
      setGridLines([]);
      setWordList([]);
      setDownloadHref(null);
      return;
    }

    const words = trimmedText
      .split(delimiterRegex)
      .map((word) => word.trim())
      .filter((word) => word.length > 0);

    if (words.length === 0) {
      setError('Please enter at least one word.');
      setGridLines([]);
      setWordList([]);
      setDownloadHref(null);
      return;
    }

    setIsLoading(true);
    setError(null);
    setGridLines([]);
    setWordList([]);
    setDownloadHref(null);

    try {
      const payload: WordSearchPayload = { words };
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data: WordSearchResponse = await response.json();

      const newGridLines = data.search?.map((row) => row.join(' ')) ?? [];
      setGridLines(newGridLines);
      setWordList(data.words ?? []);

      const csvContent = buildCsv(data.search, data.words);
      if (csvContent) {
        setDownloadHref(`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`);
      }
    } catch (err) {
      console.error('Failed to generate word search:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  const gridContent = useMemo(() => {
    if (isLoading) {
      return 'Building your puzzle...';
    }
    if (error) {
      return `Error: ${error}`;
    }
    if (gridLines.length === 0) {
      return 'Your puzzle grid will appear here.';
    }
    return gridLines.join('\n');
  }, [isLoading, error, gridLines]);

  return (
    <>
      <SiteHeader navItems={navItems} brandHref="/#projects" brandLabel="← Jameson Zeller" />

      <main>
        <section className="hero" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">Interactive Tool</p>
            <h1>Word Search Generator</h1>
            <p className="lead">
              Paste a list of words, pick a delimiter, and produce a printable word search puzzle in
              seconds. Powered by my publicly available API.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#generator">
                Generate a puzzle
              </a>
              <a
                className="btn secondary"
                href="https://github.com/imjamesonzeller/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                View the API docs
              </a>
            </div>
            <ul className="hero-meta">
              <li>
                <span className="meta-label">Output:</span> CSV download for easy printing or spreadsheet
                tweaks.
              </li>
              <li>
                <span className="meta-label">Turnaround:</span> Less than three seconds per puzzle on
                average.
              </li>
              <li>
                <span className="meta-label">Perfect for:</span> Teachers, event organizers, parents, and
                puzzle lovers.
              </li>
            </ul>
          </div>
          <div className="hero-visual">
            <div className="glow-card">
              <p className="preview-title">Sample grid</p>
              <pre className="preview-grid">{SAMPLE_GRID_LINES.join('\n')}</pre>
              <p className="preview-footnote">Generated from &quot;search, puzzle, learning, code&quot;</p>
            </div>
          </div>
        </section>

        <section className="generator" id="generator">
          <div className="section-heading">
            <h2>Generate your puzzle</h2>
            <p className="section-subtitle">
              Set a delimiter, drop in your word list, and click generate. The grid and word bank will
              appear below.
            </p>
          </div>

          <form className="generator-form" onSubmit={handleSubmit} noValidate>
            <label className="input-label" htmlFor="delimiterInput">
              Delimiter
            </label>
            <input
              type="text"
              id="delimiterInput"
              placeholder="Comma, semicolon, newline, etc. Default: spaces"
              value={delimiter}
              onChange={(event) => setDelimiter(event.target.value)}
              aria-describedby="delimiterHint"
            />

            <label className="input-label" htmlFor="textInput">
              Words to include
            </label>
            <textarea
              id="textInput"
              rows={6}
              placeholder="Example: apple, banana, cherry, dragonfruit"
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
            />

            <p id="delimiterHint" className="input-hint">
              Tip: use regular expression syntax for advanced splitting. Leave blank to split on spaces.
            </p>

            <button type="submit" id="submit-button" className="btn primary submit" disabled={isLoading}>
              {isLoading ? 'Generating...' : 'Generate word search'}
            </button>
          </form>

          <div className="results">
            <div className="results-grid">
              <h3>Grid</h3>
              <div id="response" className="grid-output" aria-live="polite">
                {gridContent}
              </div>
            </div>
            <div className="results-words">
              <h3>Word bank</h3>
              <div id="wordList" className="word-list" aria-live="polite">
                {wordList.length > 0 ? (
                  <span>
                    <strong>Words ({wordList.length}):</strong> {wordList.join(', ')}
                  </span>
                ) : (
                  <span>{isLoading ? 'Fetching words...' : 'Your word bank will appear here.'}</span>
                )}
              </div>
              <div id="downloadLink" className="download-link">
                {downloadHref && (
                  <a className="btn secondary small" href={downloadHref} download="word_search.csv">
                    Download CSV
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="tips" id="tips">
          <h2>Best results</h2>
          <div className="tips-grid">
            <article className="tip-card">
              <h3>Keep words concise</h3>
              <p>
                Shorter words (4–10 letters) generally produce more balanced grids. Mix lengths for added
                challenge.
              </p>
            </article>
            <article className="tip-card">
              <h3>Mind the delimiter</h3>
              <p>
                Using commas? Enter <code>,</code> as your delimiter. Need to split on new lines? Use{' '}
                <code>\n</code>.
              </p>
            </article>
            <article className="tip-card">
              <h3>Print-ready CSV</h3>
              <p>
                The download button exports the puzzle as a CSV so you can tweak and print from your
                favorite editor.
              </p>
            </article>
          </div>
        </section>

        <section className="support" id="support">
          <h2>Need a custom integration?</h2>
          <p>
            Reach out if you want to embed this generator elsewhere, hook it into classroom tooling, or
            extend the API.
          </p>
          <div className="support-actions">
            <a className="btn primary" href="mailto:jz@jamesonzeller.com">
              Contact me
            </a>
            <a
              className="btn secondary"
              href="https://cal.com/jamesonzeller"
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a chat
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © Jameson Anthony Zeller. Explore more projects at{' '}
          <a className="inline-link" href="https://www.jamesonzeller.com">
            jamesonzeller.com
          </a>
          .
        </p>
      </footer>
    </>
  );
};

export default WordsearchPage;
