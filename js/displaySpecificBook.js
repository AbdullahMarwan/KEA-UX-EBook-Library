import { baseUrl } from "./apiFetchRequest.js";
import { getSpecificBook } from "./fetchFunctions.js";

const bookId = getQueryParam("book_id");
const userId = sessionStorage.getItem("userId");
const role = sessionStorage.getItem("role");
console.log(userId);
console.log(role);

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
        
        if (role != "admin") {
            borrowBtn.classList.remove("hidden");
            borrowBtn.addEventListener("click", () => {
                console.log("bookid " + bookId);
                // Send data to backend
                fetch(`${baseUrl}/users/${userId}/books/${bookId}`, {
                    method: 'POST', // Use POST method
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to post data');
                    }
                    console.log('Book loaned');
                    alert('Book loaned!');
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to loan book. Please check the console for details.');
                });
            });
        }
        } catch (error) {
            console.error("Failed to load the specific book:", error.message);
        }
    })();


// Checks if user has a loan on the specified book and displays confirmation that loan already exist
async function checkIfUserHasLoan() {

}





