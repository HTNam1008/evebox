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

export interface SearchBarProps {
    onSearch: (keyword: string) => void;
}

export interface AccountTableProps {
    searchKeyword: string;
}