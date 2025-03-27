import SearchClient from "./components/searchClient";
import { fetchSearchEvents } from "@/app/(dashboard)/libs/server/fetchSearchEvents";

// interface SearchProps {
//   searchParams: { q?: string };   // Notice: use `q` if your query param is `q` or adjust accordingly
// }

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string,types?: string;startDate?: string; endDate?: string; }> }) {
  const searchTitle = (await searchParams).q || "";
  const type = (await searchParams).types || "";
  const startDate = (await searchParams).startDate;
  const endDate = (await searchParams).endDate;

  const events = searchTitle
    ? await fetchSearchEvents({
        title: searchTitle,
        type,
        startDate,
        endDate,
      })
    : [];

  console.log("Event-------",events);
  return <SearchClient events={events} />;
}