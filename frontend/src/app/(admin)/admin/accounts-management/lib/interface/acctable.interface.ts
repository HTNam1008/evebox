export interface User {
    id: string;
    name: string;
    email: string;
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