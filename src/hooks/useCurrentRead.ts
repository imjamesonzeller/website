import { useEffect, useState } from 'react';
import type { CurrentReadResponse } from '../types/api';

const API_ENDPOINT = 'https://api.jamesonzeller.com/get_current_read';
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
        const response = await fetch(API_ENDPOINT, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data: CurrentReadResponse = await response.json();
        if (isMounted) {
          setTitle(data?.attrs ?? FALLBACK_TITLE);
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
