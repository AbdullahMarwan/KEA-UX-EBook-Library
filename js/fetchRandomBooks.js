import {baseUrl, fetchData} from "./apiFetchRequest.js";

const bookUrl = "/books?n=";
const amountOfBooks = 15;

// Fetch random books and display them
async function getRandomBooks() {
    try {
        const books = await fetchData(baseUrl + bookUrl + amountOfBooks);
        displayBooks(books);
    } catch (error) {
        console.error("Failed to fetch random books:", error.message);
    }
}

function displayBooks(books) {
    const bookList = document.getElementById("book-list");

    // Clear existing content
    bookList.innerHTML = "";

    // Add books to the list
    books.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = book.title || "Untitled Book";
        bookList.appendChild(listItem);
    });
}

// Fetch random books on page load
getRandomBooks();