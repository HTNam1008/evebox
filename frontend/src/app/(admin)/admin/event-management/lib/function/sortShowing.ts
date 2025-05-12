import { Showing } from "../../../showing-management/lib/interface/showingTable.interface";

export const sortShowingData = (
  data: Showing[],
  sortConfig: { key: keyof Showing; direction: 'asc' | 'desc' } | null
): Showing[] => {
  if (!sortConfig) return data;

  const { key, direction } = sortConfig;

  return [...data].sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    if (key === "event") {
      aValue = a.event.title.toLowerCase();
      bValue = b.event.title.toLowerCase();
    }

    if (key === "ticketTypes") {
      aValue = a.ticketTypes.length;
      bValue = b.ticketTypes.length;
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
