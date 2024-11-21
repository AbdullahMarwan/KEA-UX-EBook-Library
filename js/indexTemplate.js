// ------------------------------------------------------------------ 
//---------- MAKE THE HEADER AND FOOTER INTO GLOBAL COMPONENTS 
// ------------------------------------------------------------------ 
// Paints the _header.html into the header-container header
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.querySelector('.header-container');

    fetch('./views/_header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch header');
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error));
});

// Paints the _footer.html into the footer-container footer
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('.footer-container');

    fetch('./views/_footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch footer');
            }
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
});

// ------------------------------------------------------------------ 
//---------- LOGGED IN AND LOGGED OUT HEADER CHANGES
// ------------------------------------------------------------------ 

let loggedIn = false; // Initial login state

function toggleLogin() {
    const loginButton = document.getElementById('login-button');
    const loggedInDiv = document.getElementById('logged-in');

    if (loggedIn) {
        // If logged in, show "Login" text and hide the logged-in div
        loginButton.style.display = 'block';
        loggedInDiv.style.display = 'none';
    } else {
        // If not logged in, hide "Login" text and show the logged-in div
        loginButton.style.display = 'none';
        loggedInDiv.style.display = 'flex'; // Ensure proper layout
    }

    // Toggle the login state
    loggedIn = !loggedIn;
}

// ------------------------------------------------------------------ 
//---------- MAKE THE HEADER CHANGE IF LOGGED IN / OUT
// ------------------------------------------------------------------ 
document.addEventListener("DOMContentLoaded", () => {
    // Get elements
    const loginButton = document.getElementById("login-button");
    const loggedInDiv = document.getElementById("logged-in");

    // Check if user is logged in by checking sessionStorage
    const userEmail = sessionStorage.getItem("userEmail");

    if (userEmail) {
        // If the user is logged in, hide the login button and show the logged-in profile div
        loginButton.style.display = "none";  // Hide login button
        loggedInDiv.style.display = "block";  // Show logged-in profile div
    } else {
        // If the user is not logged in, show the login button and hide the profile div
        loginButton.style.display = "block";  // Show login button
        loggedInDiv.style.display = "none";  // Hide logged-in profile div
    }
});
