export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    status: 'Active' | 'Deactivated';
};