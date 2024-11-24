// -------------------------------------------------------
//----------- STORE A USER IN SESSIONSTORAGE UPON LOGIN
//-------------------------------------------------------


// Handle login form submission
const loginForm = document.getElementById("loginForm");

// Handle login form submission
loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById("email").value; // Get email from login form
    const password = document.getElementById("password").value; // Get password from login form

    let role = ""; // Use `let` instead of `const` to allow reassignment

    const userEmail = "user.library@mail.com";
    const userPassword = "password";

    const adminEmail = "admin.library@mail.com";
    const adminPassword = "WebUdvikling24!";

    if (email === adminEmail && password === adminPassword) {
        role = "admin"; // Set role as admin
        sessionStorage.setItem("adminEmail", email); // Store the email in sessionStorage
        sessionStorage.setItem("role", role); // Store the email in sessionStorage
        window.location.href = '../../index.html'; // Redirect to admin page
    } else if (email === userEmail && password === userPassword) {
        role = "user"; // Set role as admin
        sessionStorage.setItem("role", role); // Store the email in sessionStorage
        sessionStorage.setItem("userEmail", email); // Store the email in sessionStorage
        alert("Logged in successfully!"); // Optional success message
        window.location.href = '../../index.html'; // Redirect to user page
    } else {
        alert("Please enter valid credentials."); // Show error if credentials are incorrect
    }
});


// -------------------------------------------------------
//----------- POST USER TO DB AFTER SIGNUP
//-------------------------------------------------------
const signupForm = document.getElementById("signupForm"); // Get signup form

// Handle signup form submission
signupForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const email = document.getElementById("emailSignup").value.trim();
    const password = document.getElementById("passwordSignup").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();
    const first_name = document.getElementById("firstname").value.trim();
    const last_name = document.getElementById("lastname").value.trim();
    const birth_date = document.getElementById("birthday").value;
    const address = document.getElementById("address").value.trim();
    const phone_number = document.getElementById("phoneNo").value.trim();

    // Validate passwords match
    if (password !== confirmPassword) {
        alert("Passwords don't match.");
        return;
    }

    // Validate the birthday is in the past
    if (new Date(birth_date) > new Date()) {
        alert("Birthday cannot be in the future.");
        return;
    }

    // Prepare FormData
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("address", address);
    formData.append("phone_number", phone_number);
    formData.append("birth_date", birth_date);

    // Send data to backend
    fetch("http://localhost:8080/users", {
        method: "POST",
        body: formData, // Send FormData
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to sign up");
            }
            return response.json();
        })
        .then((data) => {
            console.log("User added:", data);
            alert("You have been signed up! Please login");
            signupForm.reset();
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to sign up user. Please check the console for details.");
        });
});
