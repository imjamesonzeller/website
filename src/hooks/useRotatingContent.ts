import { useEffect, useMemo, useState } from 'react';

interface Options {
  intervalMs?: number;
  fadeDurationMs?: number;
}

const DEFAULT_INTERVAL = 3600;
const DEFAULT_FADE = 400;

export function useRotatingContent<T>(items: T[], options: Options = {}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const intervalMs = options.intervalMs ?? DEFAULT_INTERVAL;
  const fadeDurationMs = options.fadeDurationMs ?? DEFAULT_FADE;

  useEffect(() => {
    if (items.length <= 1) {
      return;
    }

    let fadeTimeout: number | undefined;
    const intervalId = window.setInterval(() => {
      setVisible(false);
      fadeTimeout = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % items.length);
        setVisible(true);
      }, fadeDurationMs);
    }, intervalMs);

    return () => {
      window.clearInterval(intervalId);
      if (fadeTimeout) {
        window.clearTimeout(fadeTimeout);
      }
    };
  }, [items, intervalMs, fadeDurationMs]);

  const currentItem = useMemo(() => items[index], [items, index]);

  return { item: currentItem, isVisible: visible };
}
