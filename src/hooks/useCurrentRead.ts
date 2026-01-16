import { useEffect, useState } from 'react';
import type { CurrentReadResponse } from '../types/api';
import { apiFetch } from '../utils/api';

const FALLBACK_TITLE = 'Tuesdays with Morrie by Mitch Albom';

export function useCurrentRead() {
  const [title, setTitle] = useState<string>('Loading...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchCurrentRead() {
      try {
        setIsLoading(true);
        const data = await apiFetch<CurrentReadResponse>({
          endpoint: '/get_current_read',
          method: 'GET'
        });

        if (isMounted) {
          const resolvedTitle = data?.currentRead ?? data?.attrs ?? FALLBACK_TITLE;
          setTitle(resolvedTitle);
          setError(null);
        }
      } catch (err) {
        console.error('Failed to fetch current read:', err);
        if (isMounted) {
          setTitle(FALLBACK_TITLE);
          setError(err instanceof Error ? err.message : 'Unknown error');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCurrentRead();

    return () => {
      isMounted = false;
    };
  }, []);

  return { title, isLoading, error };
}
