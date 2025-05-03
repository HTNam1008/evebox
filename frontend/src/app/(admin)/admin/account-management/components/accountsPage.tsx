"use client";

/* Package System */
import 'tailwindcss/tailwind.css';
import { useEffect, useState, useTransition } from 'react';

/* Package Application */
import SearchBar from './searchBar';
import FilterBar from './filter';
import AccountTable from './accountTable';
import { User, UsersData } from "@/types/model/admin/user";
import { fetchUsers } from '../lib/hooks/fetchUsers';
import Error from '../error';
import Loading from '../loading';

export default function AccountPage() {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(1);
    const [usersData, setUsersData] = useState<UsersData>({ users: [], total: 0 });
    const [isPending, startTransition] = useTransition();
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleResetFilter = () => {
        setRoleFilter('');
        setDateFrom('');
        setDateTo('');
    };

    useEffect(() => {
        const loadUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const data = await fetchUsers(currentPage, pageSize);
                setUsersData(data.data);
            } catch (err) {
                console.error("Failed to fetch users:", err);
                setError("Failed to load users. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [currentPage, pageSize]);

    const handlePageChange = (page: number) => {
        if (page === currentPage) return;

        startTransition(async () => {
            setCurrentPage(page);
        });
    };

    const handleStatusUpdate = (updatedUsers: User[]) => {
        setUsersData(prevData => ({
            ...prevData,
            users: updatedUsers
        }));
    };

    if (isLoading) {
        return <><Loading /></>;
    }

    if (error) {
        return <Error />;
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-[#0C4762] mb-1">Quản lý Account</h1>
            <p>Quản lý thông tin và trạng thái tài khoản</p>
            <div className="border-t-2 border-[#0C4762] mt-2"></div>

            <div className="flex justify-between items-center mt-6 mb-2">
                <SearchBar onSearch={setSearchKeyword} />
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
                users={usersData.users || []}
                totalItems={usersData.total || 0}
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