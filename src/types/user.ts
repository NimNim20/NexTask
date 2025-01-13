import { Timestamp } from 'firebase/firestore';

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: Timestamp;
}
