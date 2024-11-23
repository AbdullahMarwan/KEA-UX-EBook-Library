document.addEventListener("DOMContentLoaded", () => {
    const headerContainer = document.querySelector(".header-container");

    // Load the header HTML
    fetch("../views/_header.html")  
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch header");
            }
            return response.text();
        })
        .then((html) => {
            headerContainer.innerHTML = html;

            // Now update the user status after the header is loaded
            updateUserStatus();
        })
        .catch((error) => console.error("Error loading header:", error));
});

// Function to update the user status based on sessionStorage
function updateUserStatus() {
    const userStatus = document.getElementById("user-status");

    if (!userStatus) {
        console.error("#user-status not found in the DOM");
        return;
    }

    // Fetch user email from sessionStorage (only store email)
    const userEmail = sessionStorage.getItem("userEmail");

    // Admin credentials (hardcoded) - email only
    const adminEmail = "admin.library@mail.com";

    // Update the header based on login status
    if (userEmail === adminEmail) {
        userStatus.innerHTML = `
            <div class="logged-in" id="logged-in">
                <img src="../assets/profile.svg" alt="profile" class="image-left">
                <img src="../assets/arrow.svg" alt="arrow" class="image-right">
            </div>
        `;
        setupMenu(
            ["<a href='../views/adminProfile.html'>Add New Book</a>", "<a href='../views/displayBooks.html'>Browse Books</a>", "<a href='#' id='logout'>Logout</a>"],
            []
        );
    } else if (userEmail) {
        userStatus.innerHTML = `
            <div class="logged-in" id="logged-in">
                <img src="../assets/profile.svg" alt="profile" class="image-left">
                <img src="../assets/arrow.svg" alt="arrow" class="image-right">
            </div>
        `;
        setupMenu(
            ["<a href='../views/userProfile.html'>User Profile</a>", "<a href='../views/displayBooks.html'>Browse Books</a>", "<a href='#' id='logout'>Logout</a>"],
            []
        );
    } else {
        userStatus.innerHTML = `
            <h4>
                <a href="../views/login.html" id="login-button">Login</a>
            </h4>
        `;
    }
}

// Function to create the dropdown menu for logged-in users
function setupMenu(menuItems, links) {
    const loggedInMenu = document.getElementById("logged-in");

    // Track whether the menu is open or closed
    let menuOpen = false;
    let menu;

    loggedInMenu.addEventListener("click", () => {
        if (menuOpen) {
            // If the menu is already open, remove it
            menu.remove();
            menuOpen = false;
        } else {
            // If the menu is closed, create a new menu and display it
            menu = document.createElement("ul");
            menu.classList.add("dropdown-menu");

            menuItems.forEach((item) => {
                menu.innerHTML += `<li>${item}</li>`;
            });

            loggedInMenu.appendChild(menu);
            menuOpen = true;

            // Add logout functionality
            const logout = document.getElementById("logout");
            if (logout) {
                logout.addEventListener("click", (e) => {
                    e.preventDefault();
                    sessionStorage.clear();  // Clear sessionStorage upon logout
                    updateUserStatus();  // Update the UI to show the Login link
                    window.location.href = "../index.html";  // Redirect to homepage or login page
                });
            }
        }
    });
}
