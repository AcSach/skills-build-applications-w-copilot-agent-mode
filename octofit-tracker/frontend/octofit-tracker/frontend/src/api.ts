export const getApiBaseUrl = (): string => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

export const buildApiUrl = (resource: string): string => {
  const normalizedResource = resource.replace(/^\/+/, '');
  return `${getApiBaseUrl()}/api/${normalizedResource}`;
};

export const normalizeCollection = (payload: unknown, key: string): any[] => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && typeof payload === 'object') {
    const data = payload as Record<string, unknown>;

    const directCollection = data[key];
    if (Array.isArray(directCollection)) {
      return directCollection;
    }

    const results = data.results;
    if (Array.isArray(results)) {
      return results;
    }

    const items = data.items;
    if (Array.isArray(items)) {
      return items;
    }

    const nestedData = data.data;
    if (Array.isArray(nestedData)) {
      return nestedData;
    }
  }

  return [];
};

export const fetchCollection = async (resource: string, key: string): Promise<any[]> => {
  const response = await fetch(buildApiUrl(resource));

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  return normalizeCollection(payload, key);
};
