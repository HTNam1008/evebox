import { headers } from "next/headers";

export const fetchUsers = async (page: number, pageSize: number) => {
    try {
        
        const headersList = await headers();
        const cookie = headersList.get('cookie');
        const requestHeaders: HeadersInit = {};
        
        if (cookie) {
          requestHeaders['Cookie'] = cookie;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/admin/user?page=${page}&pageSize=${pageSize}`, {  
                
                method: "GET",
                headers: requestHeaders,
                next: {
                    revalidate: 60 
                },
                // cache: "force-cache",
        })
        if (!response.ok) {
            // console.error("Error fetching users:", response);
            throw new Error('Failed to fetch users');
        }

      return response.json();
    } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
    }
}