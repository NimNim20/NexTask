declare module '../../src/components/config/firebase' {
    import { FirebaseApp } from 'firebase/app';
    import { Analytics } from 'firebase/analytics';
    import { Firestore } from 'firebase/firestore';

    export const app: FirebaseApp;
    export const analytics: Analytics;
    export const db: Firestore;
}
