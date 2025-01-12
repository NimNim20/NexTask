export type UserRole = 'user' | 'admin' | 'projectAdministrator' ;

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}