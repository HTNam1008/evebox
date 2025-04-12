export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    status: 'Active' | 'Deactivated';
};

export interface ConfirmActiveProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    currentStatus: 'Active' | 'Deactivated';
}

export interface SortConfig<T> {
    key: keyof T;
    direction: 'asc' | 'desc';
}

export interface SortIconProps<T> {
    field: keyof T;
    sortConfig: SortConfig<T> | null;
}

//Search 
export interface SearchBarProps {
    onSearch: (keyword: string) => void;
}

export interface AccountTableProps {
    searchKeyword: string;
    roleFilter: string;
    dateFrom: string;
    dateTo: string;
}

//Filter
export interface FilterProps {
    roleFilter: string;
    onRoleChange: (value: string) => void;
    dateFrom: string;
    dateTo: string;
    onDateFromChange: (value: string) => void;
    onDateToChange: (value: string) => void;
    onReset: () => void;
}