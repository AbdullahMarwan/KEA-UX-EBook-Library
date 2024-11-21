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
        // displaySpecificBook(book);
        displayBookList(book);
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

// Displaying book using template literal
// function displaySpecificBook(book) {
//     const bookItem = document.getElementById("specific-book");

//     // Clear existing content
//     bookItem.innerHTML = "";

//     // Check if book is an object
//     if (book) {
//         const listItem = document.createElement("li");
//         listItem.textContent = book.title || "Untitled Book"; // Display book title (or fallback to "Untitled Book")
//         bookItem.appendChild(listItem);
//     } else {
//         const listItem = document.createElement("li");
//         listItem.textContent = "No book found.";
//         bookItem.appendChild(listItem);
//     }
// }

///////////////////////////////////////////////////////////////////
/////////////////////Fetch Random Books////////////////////////////
///////////////////////////////////////////////////////////////////

// Fetch random books and display them
async function getRandomBooks(amountOfBooks) {
    const url = `${baseUrl}/books?n=${amountOfBooks}`;
    try {
        const books = await fetchData(url);
        // displayRandomBooks(books);
        displayBookList(books);
    } catch (error) {
        console.error("Failed to fetch random books:", error.message);
    }
}

// function displayRandomBooks(books) {
//     const bookList = document.querySelector(".book-list");

//     // Clear existing content
//     bookList.innerHTML = "";

//     // Use a document fragment for better performance
//     const fragment = document.createDocumentFragment();

//     books.forEach(({ title, author, publishing_year, coverImage }) => {
//         // Create a template for the book
//         const article = document.createElement("article");
//         article.className = "book-article";

//         article.innerHTML = `
//             <div class="book-cover-ctn">
//                 <img src="${coverImage || '../assets/placeholderImg-9-16.png'}" alt="${title} cover">
//             </div>
//             <h5>${title}</h5>
//             <div class="authorYearCtn">
//                 <p><em class="author-name">${author}</em> (${publishing_year})</p>
//             </div>
//             <button class=borrow-button>Borrow</button>
//         `;

//         fragment.appendChild(article);
//     });

//     // Append the fragment to the book list
//     bookList.appendChild(fragment);
// }

////////////////////////////////////////////////////////////////////
///////////////////Fetch All Books By Author///////////////////////
//////////////////////////////////////////////////////////////////

// Fetch all books by author
async function getBooksByAuthor(authorId) {
    const url = `${baseUrl}/books?a=${authorId}`;
    try{
        const books = await fetchData(url);
        console.log(books);
        // displayBooksByAuthor(books);
        displayBookList(books);
    }
    catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

// function displayBooksByAuthor(books){
//     const bookList = document.getElementById("book-list");

//     bookList.innerHTML = "";

//     books.forEach((book) => {
//         const listItem = document.createElement("li");
//         listItem.textContent = book.title || "Untitled Book";
//         bookList.appendChild(listItem);
//     });
// }

///////////////////////////////////////////////////////////////////
/////////////////////Fetch books by search/////////////////////////
///////////////////////////////////////////////////////////////////

// Fetch books by search and display them
async function getSearchedBooks(searchWord) {
    const url = `${baseUrl}/books?s=${searchWord}`;
    try {
        const books = await fetchData(url);
        // displayedSearchedBooks(books);
        displayBookList(books);
    } catch (error) {
        console.error("Failed to fetch searched books:", error.message);
    }
}

// function displayedSearchedBooks(books) {
//     const bookList = document.querySelector(".book-list");

//     // Clear existing content
//     bookList.innerHTML = "";

//     // Use a document fragment for better performance
//     const fragment = document.createDocumentFragment();

//     books.forEach(({ title, author, publishing_year, coverImage }) => {
//         // Create a template for the book
//         const article = document.createElement("article");
//         article.className = "book-article";

//         article.innerHTML = `
//             <div class="book-cover-ctn">
//                 <img src="${coverImage || '../assets/placeholderImg-9-16.png'}" alt="${title} cover">
//             </div>
//             <h5>${title}</h5>
//             <div class="authorYearCtn">
//                 <p><em class="author-name">${author}</em> (${publishing_year})</p>
//             </div>
//             <div class="book-divider"> </div>
//         `;

//         fragment.appendChild(article);
//     });

//     // Append the fragment to the book list
//     bookList.appendChild(fragment);
// }

// Reuseable function for ALL fetches
function displayBookList(books) {
    const bookList = document.querySelector(".book-list");

    // Clear existing content
    bookList.innerHTML = "";

    // Use a document fragment for better performance
    const fragment = document.createDocumentFragment();

    books.forEach(({ title, author, publishing_year, coverImage }) => {
        // Create a template for the book
        const article = document.createElement("article");
        article.className = "book-article";

        article.innerHTML = `
            <div class="book-cover-ctn">
                <img src="${coverImage || '../assets/placeholderImg-9-16.png'}" alt="${title} cover">
            </div>
            <h5>${title}</h5>
            <div class="authorYearCtn">
                <p><em class="author-name">${author}</em> (${publishing_year})</p>
            </div>
            <div class="book-divider"> </div>
        `;

        fragment.appendChild(article);
    });

    // Append the fragment to the book list
    bookList.appendChild(fragment);
}

// Function to handle search query and display books (ChatGPT Generated)
function initializeSearchDisplay() {
    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const searchWord = params.get("search");

        // If a search term exists, update the page and fetch books
        if (searchWord) {
            const heading = document.querySelector("h3");
            heading.textContent = `Search result for "${searchWord}"`;
            getSearchedBooks(searchWord);
        } else {
            getRandomBooks(15)
        }
    });
}


// Test function to run all functions in main
function runAllFunctions(){   
    //const bookId = 1251;
    // getSpecificBook(1251);

    //const amountOfBooks = 15;
    // getRandomBooks(15)

    //const authorId = 32;
    // getBooksByAuthor(32);

    //const searchword = "winter";
    // getSearchedBooks("winter"); 
    //Checks if a searchWord is in the URL and loads the displaypage
    initializeSearchDisplay();
}

runAllFunctions();