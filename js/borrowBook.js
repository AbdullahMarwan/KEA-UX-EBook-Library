import { baseUrl, fetchData } from "./apiFetchRequest.js";
import { getSpecificBook } from "./fetchFunctions.js";

const userId = sessionStorage.getItem("userId");
const role = sessionStorage.getItem("role") || ""; // Default to an empty string if null

// Utility function to extract query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const bookId = getQueryParam("book_id");

(async function initializeSpecificBook() {
    if (!bookId) {
        console.error("No book_id found in the URL.");
        return;
    }

    try {
        await getSpecificBook(bookId); // Fetch and display the specific book
        const borrowBtn = document.getElementById("borrow-btn");

        if (role !== "admin") {
            // Show borrow button
            borrowBtn.classList.remove("hidden");

            // Add event listener for borrowing the book
            borrowBtn.addEventListener("click", async () => {
                if (!role) {
                    alert("Please log in to borrow the book.");
                    return; // Stop further execution
                }

                try {
                    const alreadyBorrowed = await getBookId(bookId);
                    if (alreadyBorrowed) {
                        console.log("The book is already borrowed.");
                        alert("Book already borrowed.");
                        return;
                    }

                    const response = await fetch(`${baseUrl}/users/${userId}/books/${bookId}`, {
                        method: "POST",
                    });

                    if (!response.ok) {
                        const errorMessage = await response.text();
                        throw new Error(errorMessage || "Failed to loan the book.");
                    }

                    console.log("Book loaned successfully!");
                    alert("Book loaned successfully!");
                } catch (error) {
                    console.error("Error loaning book:", error.message);
                    alert(error.message || "An error occurred while loaning the book.");
                }
            });
        }
    } catch (error) {
        console.error("Failed to load the specific book:", error.message);
    }
})();

// Fetch loan information for admins
async function getBookId(bookId) {
    const url = `${baseUrl}/admin/books/${bookId}`;
    try {
        const book = await fetchData(url); // Fetch book details
        const userId = Number(sessionStorage.getItem("userId")); // Ensure userId is a number

        // Check if the book is already borrowed by this user
        return book.loans.some(loan => loan.user_id === userId);
    } catch (error) {
        console.error("Failed to fetch loan info:", error.message);
        return false;
    }
}
