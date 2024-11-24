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

            // Update the user status after the header is loaded
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

    const role = sessionStorage.getItem("role");

    if (role === "admin") {
        userStatus.innerHTML = `
            <div class="logged-in" id="logged-in" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true">
                <img src="../assets/profile.svg" alt="profile" class="image-left">
                <img src="../assets/arrow.svg" alt="arrow" class="image-right">
                <ul class="dropdown-menu" aria-hidden="true">
                    <li><a href="../views/adminProfile.html" tabindex="-1">Administrative settings</a></li>
                    <li><a href="../views/displayBooks.html" tabindex="-1">Browse Books</a></li>
                    <li><a href="#" id="logout" tabindex="-1">Logout</a></li>
                </ul>
            </div>
        `;
        setupMenu();
    } else if (role === "user") {
        userStatus.innerHTML = `
            <div class="logged-in" id="logged-in" tabindex="0" role="button" aria-expanded="false" aria-haspopup="true">
                <img src="../assets/profile.svg" alt="profile" class="image-left">
                <img src="../assets/arrow.svg" alt="arrow" class="image-right">
                <ul class="dropdown-menu" aria-hidden="true">
                    <li><a href="../views/userProfile.html" tabindex="-1">User Profile</a></li>
                    <li><a href="../views/displayBooks.html" tabindex="-1">Browse Books</a></li>
                    <li><a href="#" id="logout" tabindex="-1">Logout</a></li>
                </ul>
            </div>
        `;
        setupMenu();
    } else {
        userStatus.innerHTML = `
            <h4>
                <a href="../views/login.html" id="login-button">Login</a>
            </h4>
        `;
    }
}

// Function to handle dropdown menu behavior
function setupMenu() {
    const loggedInMenu = document.getElementById("logged-in");
    const dropdownMenu = loggedInMenu.querySelector(".dropdown-menu");

    // Toggle menu open/close with keyboard and mouse
    loggedInMenu.addEventListener("click", toggleMenu);
    loggedInMenu.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleMenu();
        } else if (event.key === "Escape") {
            closeMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
        if (!loggedInMenu.contains(event.target)) {
            closeMenu();
        }
    });

    // Function to toggle the menu visibility
    function toggleMenu() {
        const isExpanded = loggedInMenu.getAttribute("aria-expanded") === "true";
        loggedInMenu.setAttribute("aria-expanded", !isExpanded);
        dropdownMenu.setAttribute("aria-hidden", isExpanded);
        updateTabIndices(!isExpanded);
    }

    // Function to close the menu
    function closeMenu() {
        loggedInMenu.setAttribute("aria-expanded", "false");
        dropdownMenu.setAttribute("aria-hidden", "true");
        updateTabIndices(false);
    }

    // Update tabindex of dropdown items
    function updateTabIndices(enable) {
        const links = dropdownMenu.querySelectorAll("a");
        links.forEach((link) => {
            link.setAttribute("tabindex", enable ? "0" : "-1");
        });
    }

    // Logout functionality
    const logout = document.getElementById("logout");
    if (logout) {
        logout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.clear(); // Clear sessionStorage on logout
            updateUserStatus(); // Update the UI to show the Login link
            window.location.href = "../index.html"; // Redirect to homepage
        });
    }
}
