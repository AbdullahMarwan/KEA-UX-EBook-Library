import { baseUrl, fetchData } from "./apiFetchRequest.js";

/////////////////////////////////////////////////////////////////
/////////////////////Fetch Book By ID////////////////////////////
/////////////////////////////////////////////////////////////////

// Fetch and display a specific book by ID
async function getSpecificBook(bookId) {
    const url = `${baseUrl}/books/${bookId}`;
    try {
        const book = await fetchData(url);
        console.log("Fetched book:", book);
        displaySpecificBook(book);
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

// Displaying book using template literal
function displaySpecificBook(book) {
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
///////////////////////////////////////////////////////////////////
/////////////////////Fetch Random Books////////////////////////////
///////////////////////////////////////////////////////////////////

// Fetch random books and display them
async function getRandomBooks(amountOfBooks) {
    const url = `${baseUrl}/books?n=${amountOfBooks}`;
    try {
        const books = await fetchData(url);
        displayRandomBooks(books);
    } catch (error) {
        console.error("Failed to fetch random books:", error.message);
    }
}

function displayRandomBooks(books) {
    const bookList = document.getElementById("random-book-list");

    // Clear existing content
    bookList.innerHTML = "";

    // Add books to the list
    books.forEach((book) => {
        const article = document.createElement("article");
        const bookTitle = document.createElement("h5");
        const bookAuthor = document.createElement("p");
        const bookYear = document.createElement("p");
        const image = document.createElement("img");
        const imageCtn = document.createElement("div");
        const authorYearCtn = document.createElement("div");


        bookAuthor.innerHTML = book.author;
        bookTitle.innerHTML = book.title;
        bookYear.innerHTML = book.publishing_year;

        bookList.appendChild(article);
        imageCtn.appendChild(image);
        article.appendChild(bookTitle);
        authorYearCtn.appendChild(bookYear);
        authorYearCtn.appendChild(bookAuthor);

        article.appendChild(authorYearCtn);
    });
}





////////////////////////////////////////////////////////////////////
///////////////////Fetch All Books By Author///////////////////////
//////////////////////////////////////////////////////////////////

// Fetch all books by author
async function getBooksByAuthor(authorId) {
    const url = `${baseUrl}/books?a=${authorId}`;
    try{
        const books = await fetchData(url);
        console.log(books);
        displayBooksByAuthor(books);
    }
    catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

function displayBooksByAuthor(books){
    const bookList = document.getElementById("books-by-author-list");

    bookList.innerHTML = "";

    books.forEach((book) => {
        const listItem = document.createElement("li");
        listItem.textContent = book.title || "Untitled Book";
        bookList.appendChild(listItem);
    });
}

// Test function to run all functions in main
function runAllFunctions(){   
    //const bookId = 1251;
    getSpecificBook(1251);

    //const amountOfBooks = 15;
    getRandomBooks(15)

    //const authorId = 32;
    getBooksByAuthor(32);
}

runAllFunctions();