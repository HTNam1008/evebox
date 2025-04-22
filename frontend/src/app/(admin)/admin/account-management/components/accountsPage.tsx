"use client";
/* Package System */
import 'tailwindcss/tailwind.css';
import { useState } from 'react';

/* Package Application */
import SearchBar from './searchBar';
import FilterBar from './filter';
import AccountTable from './accountTable';

export default function AccountPage() {
    const [searchKeyword, setSearchKeyword] = useState('');

    const [roleFilter, setRoleFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    const handleResetFilter = () => {
        setRoleFilter('');
        setDateFrom('');
        setDateTo('');
    };

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Account</h1>
            <p>Quản lý thông tin và trạng thái tài khoản</p>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <SearchBar onSearch={setSearchKeyword}/>
                <FilterBar
                    roleFilter={roleFilter}
                    onRoleChange={setRoleFilter}
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    onDateFromChange={setDateFrom}
                    onDateToChange={setDateTo}
                    onReset={handleResetFilter}
                />
            </div>

            <AccountTable 
                searchKeyword={searchKeyword}
                roleFilter={roleFilter}
                dateFrom={dateFrom}
                dateTo={dateTo}
            />
        </>
    );
}

export const dynamic = 'force-dynamic';