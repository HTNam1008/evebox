"use client";

/* Package System */
import 'tailwindcss/tailwind.css';
import { useState, useTransition } from 'react';

/* Package Application */
import SearchBar from './searchBar';
import FilterBar from './filter';
import AccountTable from './accountTable';
import { User, UsersResponse } from "@/types/model/admin/user";
import { getUsersAction } from '../lib/server/getUsersAction';

interface AccountPageProps {
    initialUsers: UsersResponse;
}

export default function AccountPage({ initialUsers }: AccountPageProps) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [usersData, setUsersData] = useState<UsersResponse>(initialUsers);
    const [isPending, startTransition] = useTransition();

    const handleResetFilter = () => {
        setRoleFilter('');
        setDateFrom('');
        setDateTo('');
    };

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;
        
        startTransition(async () => {
            try {
                const newData = await getUsersAction(page, pageSize);
                setUsersData(newData);
                setCurrentPage(page);
                
                // Scroll to top of table on page change (optional)
                document.querySelector('.table-account-management')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            } catch (error) {
                console.error("Failed to fetch users for page:", page, error);
                // Optionally show error notification
            }
        });
    };

    const handleStatusUpdate = (updatedUsers: User[]) => {
        setUsersData(prevData => ({
            ...prevData,
            data: {
                ...prevData.data,
                users: updatedUsers
            }
        }));
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
                users={usersData.data?.users || []}
                totalItems={usersData.data?.total || 0}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                loading={isPending}
                searchKeyword={searchKeyword}
                roleFilter={roleFilter}
                dateFrom={dateFrom}
                dateTo={dateTo}
                onStatusUpdate={handleStatusUpdate}
            />
        </>
    );
}