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

    // Fetch user info from sessionStorage
    const userEmail = sessionStorage.getItem("userEmail");
    const userPassword = sessionStorage.getItem("userPassword");

    // Log user email and password for debugging
    console.log("User email:", userEmail);
    console.log("User password:", userPassword);

    // Admin credentials (hardcoded)
    const adminEmail = "admin.library@mail.com";
    const adminPassword = "WebUdvikling24!";

    // Update the header based on login status
    if (userEmail === adminEmail && userPassword === adminPassword) {
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

    loggedInMenu.addEventListener("click", () => {
        const menu = document.createElement("ul");
        menu.classList.add("dropdown-menu");

        menuItems.forEach((item) => {
            menu.innerHTML += `<li>${item}</li>`;
        });

        loggedInMenu.appendChild(menu);

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
    });
}
