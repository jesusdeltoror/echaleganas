import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

import { getAuth, createUserWithEmailAndPassword, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAU9kGMihK4A4PD0mQ2zLSyxD6uP4EH7RQ",
    authDomain: "prueba-15d03.firebaseapp.com",
    projectId: "prueba-15d03",
    storageBucket: "prueba-15d03.appspot.com",
    messagingSenderId: "470725864234",
    appId: "1:470725864234:web:4774ac5feb670ab47bcc53",
    measurementId: "G-K10G3VQZXV"
};



const app = initializeApp(firebaseConfig);
const provider = new FacebookAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

const log = document.getElementById('log');
const email = document.getElementById('email');
const pass = document.getElementById('pass');
const guardar = document.getElementById('guardar');
const facebook = document.getElementById('facebook');

log.addEventListener('click', function () {
    createUserWithEmailAndPassword(auth, email.value, pass.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('si bueno');
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode + ' + ' + errorMessage);
            // ..
        });
});

facebook.addEventListener('click',() => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
})
guardar.addEventListener('click', async () => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            first: "Ada",
            last: "Lovelace",
            born: 1815
        });
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
});

