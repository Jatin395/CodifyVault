import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "",
    authDomain: "first-app-4b258.firebaseapp.com",
    databaseURL: "https://first-app-4b258-default-rtdb.firebaseio.com",
    projectId: "first-app-4b258",
    storageBucket: "first-app-4b258.firebasestorage.app",
    messagingSenderId: "317814930517",
    appId: "1:317814930517:web:a8c61e9411aefbd86f68dc"
};

const app = initializeApp(firebaseConfig);
const MyAuth = getAuth(app);
const MyDB = getFirestore(app);

export { MyAuth,MyDB };
