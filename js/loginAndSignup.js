// -------------------------------------------------------
//----------- STORE A USER IN SESSIONSTORAGE UPON LOGIN
//-------------------------------------------------------

const loginForm = document.getElementById("loginForm");

// Handle login form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value; // Get email from login form
    const password = document.getElementById("password").value; // Get password from login form

    // For simplicity, assume the email and password are correct if provided
    if (email && password) {
        // Store the email and password in sessionStorage
        sessionStorage.setItem("userEmail", email);
        sessionStorage.setItem("userPassword", password);  // Store the password as well

        // Optionally, show a success message or redirect after login
        alert("Logged in successfully!");
        
        // Redirect to the index page after login
        window.location.href = '../../index.html';
    } else {
        alert("Please enter valid credentials.");
    }
});

// -------------------------------------------------------
//----------- MAKES SURE THE TWO PASSWORDS IN SIGNUP MATCHES
//-------------------------------------------------------


const signupForm = document.getElementById("signupForm"); // Get signup form

// Handle signup form submission
signupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("emailSignup").value; // Get email from signup form
    const password = document.getElementById("passwordSignup").value; // Get password from signup form
    const confirmPassword = document.getElementById("confirmPassword").value; // Get confirm password from signup form

    // Check if both passwords match (strip leading/trailing spaces just in case)
    if (password.trim() !== confirmPassword.trim()) {
        alert("Passwords don't match.");
        return;
    }

    // For simplicity, assume the email and password are correct if provided
    if (email && password) {
        // Store the email in sessionStorage
        sessionStorage.setItem("userEmail", email);

        // Optionally, show a success message or redirect after signup
        alert("Signed up successfully!");
        
        // Redirect to the index page after signup
        window.location.href = '../../index.html';
    } else {
        alert("Please enter valid credentials.");
    }
});
