/**
 * Converts response headers to a format compatible with Fastify
 * @param headers The headers from an HTTP response
 * @returns A record of safe headers with non-null/undefined values
 */
export const convertToSafeHeaders = (
  headers: Record<string, any>,
): Record<string, string | string[]> => {
  const safeHeaders: Record<string, string | string[]> = {};

  Object.entries(headers).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      safeHeaders[key] = value as string | string[];
    }
  });

  return safeHeaders;
};
