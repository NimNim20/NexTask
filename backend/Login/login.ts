import * as dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, UserCredential, User } from 'firebase/auth';
import { FirebaseError } from 'firebase/app'; 

dotenv.config();

console.log('FIREBASE_API_KEY:', process.env.FIREBASE_API_KEY);
console.log('FIREBASE_AUTH_DOMAIN:', process.env.FIREBASE_AUTH_DOMAIN);

interface FirebaseConfig {
    apiKey: string | undefined;
    authDomain: string | undefined;
    projectId: string | undefined;
    storageBucket: string | undefined;
    messagingSenderId: string | undefined;
    appId: string | undefined;
    measurementId: string | undefined;
}

const firebaseConfig: FirebaseConfig = {
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

interface LoginResult {
    success: boolean;
    message: string;
    user?: {
        uid: string;
        email: string | null;
    };
    code?: string;
}

const loginUser = async (email: string, password: string): Promise<LoginResult> => {
    try {
        const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user: User = userCredential.user;
        console.log('Login successful:', user);
        return {
            success: true,
            message: 'Login successful',
            user: {
                uid: user.uid,
                email: user.email,
            },
        };
    } catch (error: unknown) {
        if (error instanceof FirebaseError) {
            console.error('Login failed:', error.code, error.message);
            return {
                success: false,
                message: error.message,
                code: error.code,
            };
        } else {
            console.error('An unknown error occurred:', error);
            return {
                success: false,
                message: 'An unknown error occurred',
            };
        }
    }
};

(async () => {
    const email = 'exampleuser@example.com';
    const password = 'password123456';
    const result = await loginUser(email, password);
    console.log(result);
})();
