import createApiClient from "./apiClient";

export const eventService = createApiClient(process.env.NEXT_PUBLIC_API_URL!);
export const authService = createApiClient(process.env.NEXT_PUBLIC_API_URL!);