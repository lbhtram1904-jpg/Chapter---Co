
import { initializeApp } from "https://www.gstatic.com/firebasejs/13.4.0/firebase-app.js";

import { 
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/13.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBLXrnuhLclSnKprNg8Z5YtYMbubdfhPHU",
    authDomain: "chapterco-caa92.firebaseapp.com",
    projectId: "chapterco-caa92",
    storageBucket: "chapterco-caa92.firebasestorage.app",
    messagingSenderId: "796367240258",
    appId: "1:796367240258:web:c6ffe38913ba48903341db"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
};
