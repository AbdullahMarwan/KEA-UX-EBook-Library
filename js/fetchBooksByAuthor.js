import { baseUrl, fetchData } from "./apiFetchRequest.js";

const authorId = 32;

async function getBooksByAuthor() {
    const url = `${baseUrl}/books?a=${authorId}`;
    try{
        const books = await fetchData(url);
        console.log(books);
        console.log("Hey");
        displayBooks(books);
    }
    catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}


function displayBooks(books){
    const bookList = document.getElementById("books-by-author-list");

    bookList.innerHTML = "";

    books.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = book.title || "Untitled Book";
        bookList.appendChild(listItem);
    });
}


getBooksByAuthor();