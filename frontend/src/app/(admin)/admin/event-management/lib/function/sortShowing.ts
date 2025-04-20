import { Showing } from "../../../showing-management/lib/interface/showingtable.interface";

export const sortShowingData = (
  data: Showing[],
  sortConfig: { key: keyof Showing; direction: 'asc' | 'desc' } | null
): Showing[] => {
  if (!sortConfig) return data;

  const { key, direction } = sortConfig;

  return [...data].sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    if (key === "eventTitle") {
      aValue = a.eventTitle.title.toLowerCase();
      bValue = b.eventTitle.title.toLowerCase();
    }

    if (key === "numTicketType") {
      aValue = a.numTicketType.length;
      bValue = b.numTicketType.length;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });
};
