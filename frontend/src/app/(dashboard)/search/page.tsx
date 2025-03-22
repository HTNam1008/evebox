import SearchClient from "./components/searchClient";
import { fetchSearchEvents } from "@/app/(dashboard)/libs/server/fetchSearchEvents";

// interface SearchProps {
//   searchParams: { q?: string };   // Notice: use `q` if your query param is `q` or adjust accordingly
// }

export default async function Search({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const searchTitle = (await searchParams).q;  // Use `q` or match exactly with the query parameter you used in the Link
  const events = searchTitle
    ? await fetchSearchEvents(searchTitle)
    : [];

  console.log("Event-------",events);
  return <SearchClient events={events} />;
}