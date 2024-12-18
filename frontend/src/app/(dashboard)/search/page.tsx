import SearchClient from "./components/searchClient";

// Server Component
export default async function Search() {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const events = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    
    return <SearchClient events={events} />;
}
