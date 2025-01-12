import * as dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

dotenv.config(); // Load environment variables

console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN);

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VITE_FIREBASE_APP_ID,
    measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('Login successful:', user);
        return {
            success: true,
            message: 'Login successful',
            user: {
                uid: user.uid,
                email: user.email,
            },
        };
    } catch (error) {
        console.error('Login failed:', error.code, error.message);
        return {
            success: false,
            message: error.message,
            code: error.code,
        };
    }
};

(async () => {
    const email = 'exampleuser@example.com';
    const password = 'password123456';
    const result = await loginUser(email, password);
    console.log(result);
})();
