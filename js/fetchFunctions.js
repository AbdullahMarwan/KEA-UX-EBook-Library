import { baseUrl, fetchData } from "./apiFetchRequest.js";

/////////////////////////////////////////////////////////////////
/////////////////////Fetch Book By ID////////////////////////////
/////////////////////////////////////////////////////////////////

// Fetch and display a specific book by ID
async function getSpecificBook(bookId) {
    const url = `${baseUrl}/books/${bookId}`;
    try {
        const book = await fetchData(url);
        displayBookList(book);
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
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
    } catch (error) {
        console.error("Failed to fetch random books:", error.message);
    }
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
        displayBookList(books);
    }
    catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

///////////////////////////////////////////////////////////////////
/////////////////////Fetch books by search/////////////////////////
///////////////////////////////////////////////////////////////////

// Fetch books by search and display them
async function getSearchedBooks(searchWord) {
    const url = `${baseUrl}/books?s=${searchWord}`;
    try {
        const books = await fetchData(url);
        displayBookList(books);
    } catch (error) {
        console.error("Failed to fetch searched books:", error.message);
    }
}

// Reuseable function for displaying data from ALL fetches
function displayBookList(books) {
    const bookList = document.querySelector(".book-list");

    // Clear existing content
    bookList.innerHTML = "";

    // Use a document fragment for better performance
    const fragment = document.createDocumentFragment();

    books.forEach(({ title, author, author_id, publishing_year, coverImage }) => {
        // Create a template for the book
        const article = document.createElement("article");
        article.className = "book-article";

        article.innerHTML = `
            <div class="book-cover-ctn">
                <img src="${coverImage || '../assets/placeholderImg-9-16.png'}" alt="${title} cover">
            </div>
            <h5>${title}</h5>
            <div class="authorYearCtn">
                <p>
                    <em class="author-name" data-id="${author}" style="cursor: pointer; color: blue; text-decoration: underline;">${author}</em> (${publishing_year})
                </p>
            </div>
            <div class="book-divider"> </div>
        `;
        fragment.appendChild(article);
    });

    // Append the fragment to the book list
    bookList.appendChild(fragment);

    // Attach event listeners to author names
    attachAuthorClickEvents();
}

// OLD attachAuthorClickEvents
// function attachAuthorClickEvents() {
//     const authorElements = document.querySelectorAll(".author-name");
//     authorElements.forEach((authorElement) => {
//         authorElement.addEventListener("click", () => {
//             const author = authorElement.getAttribute("data-id");
//             const authorId = findAuthor(author);
//             console.log("authorId: " + authorId)
            
//             getBooksByAuthor(authorId);
//         });
//     });
// }

function attachAuthorClickEvents() {
    const authorElements = document.querySelectorAll(".author-name");

    authorElements.forEach((authorElement) => {
        authorElement.addEventListener("click", async () => {
            const authorName = authorElement.textContent; // Get the author's name from the element
            try {
                const authorId = await findAuthor(authorName); // Wait for the author ID
                if (authorId) {
                    getBooksByAuthor(authorId); // Pass the ID to fetch books
                } else {
                    console.log(`No books found for author: ${authorName}`);
                }
            } catch (error) {
                console.error("Error finding author:", error.message);
            }
        });
    });
}

async function findAuthor(authorName) {
    const url = `${baseUrl}/authors`;

    try {
        const authors = await fetchData(url); // Fetch authors list

        // Find the author with a matching name
        const author = authors.find((author) => author.author_name === authorName);

        if (author) {
            console.log("Author ID:", author.author_id);
            return author.author_id; // Return the author's ID
        } else {
            console.log(`Author '${authorName}' not found.`);
            return null; // Return null if not found
        }
    } catch (error) {
        console.error("Failed to fetch specific author:", error.message);
        throw error; // Re-throw the error for further handling if needed
    }
}

// OLD FINDAUTHOR
// async function findAuthor(authorName) {
//     const url = `${baseUrl}/authors`;
//     try{
//         const authors = await fetchData(url);

//         authors.forEach((author) => {
//             // Iterate through the list of authors
//             if (author.author_name === authorName) {
//                 console.log("Author ID: " + author.author_id)
//                 return author.author_id;
//             }
//         });
//     }
//     catch (error) {
//         console.error("Failed to fetch specific book:", error.message);
//     }
// }

// Function to handle search query and display books (ChatGPT Generated)
function initializeSearchDisplay() {
    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const searchWord = params.get("search");
        const heading = document.querySelector("h3");

        // If a search term exists, update the page and fetch books
        if (searchWord) {
            heading.textContent = `Search result for "${searchWord}"`;
            getSearchedBooks(searchWord);
        } else {
            heading.textContent = `Random books`;
            getRandomBooks(15)
        }
    });
}

// // Test function to run all functions (TODO, Delete later after everything is finished)
// function runAllFunctions(){   
//     //const bookId = 1251;
//     // getSpecificBook(1251);

//     //const amountOfBooks = 15;
//     // getRandomBooks(15)

//     //const author_id = 32;
//     // getBooksByAuthor(32);

//     //const searchword = "winter";
//     // getSearchedBooks("winter"); 

//     //Checks if a searchWord is in the URL and loads the displaypage
//     initializeSearchDisplay();
// }

// runAllFunctions();

initializeSearchDisplay();