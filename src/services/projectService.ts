import { db } from '../components/config/firebase';
import { collection, getDocs } from 'firebase/firestore';

const fetchProjects = async () => {
  const projectsCollection = collection(db, 'projects');
  const projectSnapshot = await getDocs(projectsCollection);
  const projects = projectSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  console.log(projects);
};

fetchProjects();
