
const signupForm = document.getElementById("login");

signupForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    if (password.length < 8) {
        alert("Your password must be at least 8 characters!");
        return;
    }

    alert("Your form is working! ♡");
});
