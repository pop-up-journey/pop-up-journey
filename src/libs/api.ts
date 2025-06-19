type FetchOptions<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: T;
  headers?: {
    'Content-Type'?: 'application/json'; // body
    Authorization?: string; // jwt
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

export const clientApi = async <T>(segment: string, options: FetchOptions<T>) => {
  try {
    const response = await fetch(`${BASE_URL}${segment}`, {
      method: options.method,
      body: options.body ? JSON.stringify(options.body) : undefined,
      headers: options.headers,
    });

    return response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
