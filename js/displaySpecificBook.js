import { baseUrl, fetchData } from "./apiFetchRequest.js";
import { getSpecificBook } from "./fetchFunctions.js";

const userId = sessionStorage.getItem("userId");
const role = sessionStorage.getItem("role");

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
            const canBorrow = await checkIfUserCanBorrow(); // Check if user can borrow the book

            if (!canBorrow) {
                alert("You already have this book loaned.");
                return; // Exit early if the user already has a loan
            }

            // Show borrow button and add event listener
            borrowBtn.classList.remove("hidden");
            borrowBtn.addEventListener("click", async () => {
                console.log("Attempting to borrow book with ID:", bookId);

                try {
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
                    alert("Book already borrowed");
                }
            });
        }
    } catch (error) {
        console.error("Failed to load the specific book:", error.message);
    }
})();

// Check if the user already has a loan for the specific book
async function checkIfUserCanBorrow() {
    const url = `${baseUrl}/admin/books/${bookId}`;
    try {
        const book = await fetchData(url); // Fetch book details including loans
        console.log("Book loans:", book.loans);

        // Check if user ID matches any existing loan
        const loans = book.loans || [];
        const hasLoan = loans.some((loan) => loan.user_id === userId);

    } catch (error) {
        console.error("Failed to check loans:", error.message);
        return false; // Assume user cannot borrow in case of error
    }
}