
import {
    auth,
    createUserWithEmailAndPassword
} from "./firebase.js";

const signupForm = document.getElementById("signup");

signupForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Your passwords don't match!");
        return;
    }

    if (password.length < 8) {
        alert("Your password must be at least 8 characters!");
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        alert("Welcome to Chapter & Co.! Your account has been created ♡");

        window.location.href = "index.html";

    } catch (error) {
        alert("Signup failed: " + error.message);
    }
});
