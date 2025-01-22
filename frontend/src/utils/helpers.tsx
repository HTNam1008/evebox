/**
 * Formats a date string into a more readable format.
 *
 * @param dateStr - The date string to format.
 * @returns The formatted date string in the format "DD MMM YYYY".
 */
export function formatYYYYMMDDToLocaleDateString(dateStr: string): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month
  const year = date.getFullYear();

  return `${day} ${month}, ${year}`;
}