type FetchOptions<T> = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: T;
  headers?: {
    'Content-Type'?: 'application/json'; // body
    Authorization?: string; // jwt
  };
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL_DEV;

// 타입 수정해줘야 할듯
// export const clientApi = async <T, R = any>(segment: string, options: FetchOptions<T>): Promise<R> => {
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
