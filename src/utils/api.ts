const PRIMARY_API = 'https://api.jamesonzeller.com';
const SECONDARY_API = 'https://secondary-api.jamesonzeller.com';

interface FetchOptions extends RequestInit {
  endpoint: string;
}

export async function apiFetch<T>({ endpoint, ...options }: FetchOptions): Promise<T> {
  const primaryUrl = `${PRIMARY_API}${endpoint}`;
  const secondaryUrl = `${SECONDARY_API}${endpoint}`;

  try {
    const response = await fetch(primaryUrl, options);
    if (!response.ok) {
      throw new Error(`Primary API failed with status ${response.status}`);
    }
    return response.json();
  } catch (primaryError) {
    console.warn('Primary API failed, trying secondary:', primaryError);

    const response = await fetch(secondaryUrl, options);
    if (!response.ok) {
      throw new Error(`Secondary API failed with status ${response.status}`);
    }
    return response.json();
  }
}
