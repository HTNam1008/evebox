import { headers } from "next/headers";

export const fetchProfile = async () => {
  try {
    const headersList = await headers();
    const cookie = headersList.get('cookie');
    const requestHeaders: HeadersInit = {};
    
    if (cookie) {
      requestHeaders['Cookie'] = cookie;
    }
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user/me`,
      {
        method: "GET",
        headers: requestHeaders,
        cache: "no-store",
        next: { revalidate: 0 },
      }

    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch profile');
    }

    const data = await response.json();
    return data.data; 
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};