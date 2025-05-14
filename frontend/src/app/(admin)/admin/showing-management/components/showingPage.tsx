'use client'

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState, useEffect } from "react";

/* Package Application */
import ShowingTable from './showingTable';
import SearchBar from './common/searchBar';
import FilterBar from './common/filter';

export default function ShowingPage() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedSearch(searchKeyword);
        }, 2000);

        return () => clearTimeout(timeoutId);
    }, [searchKeyword]);

    const handleResetFilter = () => {
        setDateFrom('');
        setDateTo('');
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Showing</h1>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <SearchBar onSearch={setSearchKeyword} />
                <FilterBar
                    dateFrom={dateFrom} dateTo={dateTo}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onReset={handleResetFilter}
                />
            </div>

            <ShowingTable searchKeyword={debouncedSearch} dateFrom={dateFrom} dateTo={dateTo} />
        </>
    )
}