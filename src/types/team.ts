import { Timestamp } from 'firebase/firestore';

export interface Team {
    id: string;
    name: string;
    members: string[];
    createdBy: string;
    createdAt: Timestamp;
}
