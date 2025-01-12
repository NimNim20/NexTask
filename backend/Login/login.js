import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

// Load environment variables from .env file
dotenv.config();

// Check if environment variables are loaded correctly
console.log('Firebase API Key:', process.env.FIREBASE_API_KEY);

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login function
const loginUser = async (email, password) => {
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

// Example usage
(async () => {
    const email = 'example@example.com';
    const password = 'yourpassword';
    const result = await loginUser(email, password);
    console.log(result);
})();
