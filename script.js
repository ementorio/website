import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAYu7LOSZCASFim9gf2tSo8_akeSEErxgU",
    authDomain: "authenication-form.firebaseapp.com",
    projectId: "authenication-form",
    storageBucket: "authenication-form.appspot.com",
    messagingSenderId: "1009189573194",
    appId: "1:1009189573194:web:7028eb2fc9169499d5ccb3",
    measurementId: "G-HWGRK1CR78"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Elements
const signInButton = document.getElementById("signInButton");
const signOutButton = document.getElementById("signOutButton");

signOutButton.style.display = "none";

const userSignIn = async () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;

            // Store user information in localStorage
            localStorage.setItem("userName", user.displayName);
            localStorage.setItem("userEmail", user.email);

            // Redirect to another HTML page after successful registration
            window.location.href = "anotherPage.html";
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
};

const emailPasswordSignIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully. Redirecting...');
        window.location.href = 'anotherPage.html';
    } catch (error) {
        console.error('Error signing in with email/password:', error.message);
    }
};

const userSignOut = async () => {
    signOut(auth)
        .then(() => {
            alert("You have signed out successfully!");
        })
        .catch((error) => {
            console.error('Error signing out:', error.message);
        });
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        signOutButton.style.display = "block";
    } else {
        signOutButton.style.display = "none";
    }
});

signInButton.addEventListener("click", userSignIn);

// Assume you have a form with class 'auth-form' and id 'signin-form' in your HTML
const signinForm = document.getElementById('signin-form');

if (signinForm) {
    signinForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        // Call the emailPasswordSignIn function for email/password authentication
        emailPasswordSignIn(email, password);
    });
} else {
    console.error('Element with id "signin-form" not found in the document.');
}

signOutButton.addEventListener("click", userSignOut);

// Retrieve user information from localStorage
const userName = localStorage.getItem("userName");
const userEmail = localStorage.getItem("userEmail");

// Update the content inside the box
const boxMessage = document.querySelector('.box-message');
if (boxMessage) {
    boxMessage.innerHTML = `
        <p>Username: <span>${userName}</span></p>
        <p>Email: <span>${userEmail}</span></p>
    `;
}
