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

    const adminEmail = "admin.library@mail.com";
    const adminPassword = "WebUdvikling24!";

    try {
        // First check if the email is for admin
        if (email === adminEmail && password === adminPassword) {
            sessionStorage.setItem("role", "admin"); // Set admin role
            sessionStorage.setItem("adminEmail", email); // Store the admin email in sessionStorage
            //window.location.href = "../../index.html"; // Redirect to admin page
            return; // Exit after successful admin login
        }
    } catch (error) {
        console.error("Login failed:", error); // Log any errors
    }


    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

   // Send data to backend
   fetch('http://localhost:8080//users/login', {
    method: 'POST',
    body: formData // Send FormData directly
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to login');
    }
    return response.json();
})
.then(data => {
    console.log('Logged in:', data);
    alert('Logged in successfully!');

    const role = "user"; // Use let instead of const to allow reassignment
    sessionStorage.setItem("role", role); // Store the email in sessionStorage
    sessionStorage.setItem("userId", data.user_id);
    console.log(role)
    window.location.href = "../../index.html";
    

})
.catch(error => {
    console.error('Error:', error);
    alert('Failed to login. Please check the console for details.');
});



});





// -------------------------------------------------------
//----------- POST USER TO DB AFTER SIGNUP and save the email in sessionStorage after succesdfull signup
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

            // Save email to sessionStorage
            sessionStorage.setItem("userEmail", email);

            // Redirect to the index page
            window.location.href = "../../index.html";
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to sign up user. Please check the console for details.");
        });
});
