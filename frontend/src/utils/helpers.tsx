/**
 * Formats a date string into a more readable format.
 *
 * @param dateStr - The date string to format.
 * @returns The formatted date string in the format "DD MMM YYYY".
 */
export function formatYYYYMMDDToLocaleDateString(dateStr: string, includeTime: boolean = false): string {
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, '0');
  const month = date.toLocaleString('en-US', { month: 'short' }); // Get short month
  const year = date.getFullYear();

  let formattedDate = `${day} ${month}, ${year}`;

  if (includeTime) {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    // const seconds = date.getSeconds().toString().padStart(2, '0');
    // formattedDate += ` ${hours}:${minutes}:${seconds}`;
    formattedDate += ` ${hours}:${minutes}`;
  }

  return formattedDate;
}

