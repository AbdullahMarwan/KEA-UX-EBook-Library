import {baseUrl, fetchData} from "./apiFetchRequest.js";

const bookId = 1251;

// Fetch and display a specific book by ID
async function getSpecificBook() {
    const url = `${baseUrl}/books/${bookId}`;
    try {
        const book = await fetchData(url);
        console.log("Fetched book:", book);
        displayBook(book);
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

function displayBook(book) {
    const bookItem = document.getElementById("specific-book");

    // Clear existing content
    bookItem.innerHTML = "";

    // Check if book is an object
    if (book) {
        const listItem = document.createElement("li");
        listItem.textContent = book.title || "Untitled Book"; // Display book title (or fallback to "Untitled Book")
        bookItem.appendChild(listItem);
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "No book found.";
        bookItem.appendChild(listItem);
    }
}

getSpecificBook();