export const apiFetch = async (
    url: string,
    method: string = 'GET', // Default method is GET
    body: any = null,        // Optional body for POST/PUT requests
    headers: any = {
      'Content-Type': 'application/json',
    }
  ) => {
    try {
      const options: RequestInit = {
        method,
        headers,
      };
  
      if (body) {
        options.body = JSON.stringify(body);
      }
      const response = await fetch(url, options);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.statusText}, Details: ${JSON.stringify(errorData)}`);
        return null
      }
  
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  };