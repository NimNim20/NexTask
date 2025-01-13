import { Timestamp } from 'firebase/firestore';
import { Team } from './team';
import { Task } from './task';

export interface Project {
  id: string;
  tasks: Task[];
  name: string;
  team: Team | null;
  teamId: string | null; 
  createdAt: Timestamp;

}

