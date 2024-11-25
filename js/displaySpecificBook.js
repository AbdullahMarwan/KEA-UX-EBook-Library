import { getSpecificBook } from "./fetchFunctions.js";

// Utility function to extract query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Invoked function (runs immediately when script is loaded) checks for book_id parameter and displays the book if it exists 
(async function initializeSpecificBook() {
    const bookId = getQueryParam("book_id"); // Extract `book_id` from the query string
    if (!bookId) {
        console.error("No book_id found in the URL.");
        return;
    }

    try {
        await getSpecificBook(bookId); // Fetch and display the specific book
        const borrowBtn = document.getElementById("borrow-btn");

        borrowBtn.addEventListener("click", () => {
            console.log("hej");
        });


    } catch (error) {
        console.error("Failed to load the specific book:", error.message);
    }
})();
