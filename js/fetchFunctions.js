import { baseUrl, fetchData } from "./apiFetchRequest.js";

const role = sessionStorage.getItem("role");

/////////////////////////////////////////////////////////////////
/////////////////////Fetch Book By ID////////////////////////////
/////////////////////////////////////////////////////////////////

// Fetch and display a specific book by ID
export async function getSpecificBook(bookId) {
    const url = `${baseUrl}/books/${bookId}`;
    try {
        const book = await fetchData(url); // Fetch book data
        displaySpecificBook(book); // Display basic book details

        if (role === "admin") {
            // Fetch and display loan information if admin
            await getLoanInfo(bookId);
        }
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}

// Fetch loan information for admins
export async function getLoanInfo(bookId) {
    const url = `${baseUrl}/admin/books/${bookId}`;
    try {
        const book = await fetchData(url);
        const loans = book.loans || []; // Get loans or an empty array if none
        displayLoanInfo(loans); // Display the loan information
    } catch (error) {
        console.error("Failed to fetch loan info:", error.message);
    }
}

//////////////////////////////////////////////////////////////////
///////////////////Fetch admin books to show loan info////////////
//////////////////////////////////////////////////////////////////

// Display loan information in the DOM
function displayLoanInfo(loans) {
    const bookItem = document.getElementById("specific-book");
    if (!bookItem) return;
    
    let loanInfo = "";

    if (loans.length > 0) {
        loanInfo = `
            <section class="loan-info-ctn">
                <h3>Loan Info</h3>
                <ul>
                    ${loans.map(loan => 
                        `<li><strong>User ID:</strong> ${loan.user_id}, <strong>Loan Date:</strong> ${loan.loan_date}</li>`
                    ).join("")}
                </ul>
            </section>
        `;
    } else {
        loanInfo = `
            <section class="loan-info-ctn">
                <h3>Loan Info</h3>
                <p>No loans available for this book.</p>
            </section>
        `;
    }

    // Append the loan info to the book display
    bookItem.innerHTML += loanInfo;
}



//////////////////////////////////////////////////////////////////
///////////////////Display Specific Book With Template Literal////
//////////////////////////////////////////////////////////////////
 
function displaySpecificBook(book) {
    const bookItem = document.getElementById("specific-book");

 
    // Clear existing content
    bookItem.innerHTML = "";
 
    // Display basic book information
    bookItem.innerHTML = `
        <section class="book-short-details">
            <h1>${book.title || "Name of Book"}</h1>
            <p><strong>Author:</strong> ${book.author || "Can't find Author"}</p>
            <p><strong>Publishing Year:</strong> ${book.publishing_year || "Can't find publishing year"}</p>
        </section>
 
        <div class="single-book-cover-ctn">
            <img src="${book.cover || '../assets/placeholderImg-9-16.png'}" alt="${book.title || "Book"} cover">
        </div>
 
        <div class="book-information-ctn">
    
            <h2>Book Info</h2>
            <h3>Author</h3>
            <p>${book.author || "Can't find Author"}</p>
    
            <h3>Publisher</h3>
            <p>${book.publishing_company || "Can't find Publisher"}</p>
    
            <h3>Publishing Year</h3>
            <p>${book.publishing_year || "Can't find publishing year"}</p>

            <button class="borrow-button hidden" id="borrow-btn" type="submit">Borrow</button>
        </div>
    `;
    
}

// Returns book_id from query param
async function getBookIdFromParam() {
    const bookId = getQueryParam("book_id"); // Extract `book_id` from the query string
    if (!bookId) {
        console.error("No book_id found in the URL.");
        return;
    }
    return bookId;
}

///////////////////////////////////////////////////////////////////
/////////////////////Fetch Random Books////////////////////////////
///////////////////////////////////////////////////////////////////

// Fetch random books and display them
async function getRandomBooks(amountOfBooks) {
    const url = `${baseUrl}/books?n=${amountOfBooks}`;
    try {
        const books = await fetchData(url);
        displayBookList(books);
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

    // Assuming books have a unique `book_id`
    books.forEach(({ title, author, publishing_year, cover, book_id }) => {
        const article = document.createElement("article");
        article.className = "book-article";

        article.innerHTML = `
            <div class="book-cover-ctn">
                <a class="bookLink" data-id="${book_id}">
                    <img src="${cover || '../assets/placeholderImg-9-16.png'}" alt="${title} cover">
                </a>
            </div>
            <h4><a" class="bookLink" data-id="${book_id}">${title}</a></h4>
            <div class="authorYearCtn">
                <p>
                    <a target="_blank" class="author-name">${author}</a> (${publishing_year})
                </p>
            </div>
            <div class="book-divider"> </div>
        `;
        fragment.appendChild(article);
    });

    // Append the fragment to the book list
    bookList.appendChild(fragment);

    const links = document.querySelectorAll(".bookLink");
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const bookId = this.getAttribute("data-id"); // Get the `book_id` from the data-id attribute
            console.log("Clicked Book ID:", bookId);
            // Navigate to the new page with the book_id as a query parameter
            window.location.href = `displaySpecificBook.html?book_id=${bookId}`;
        });
    });
    attachAuthorClickEvents();
}

// Utility function to extract query parameters
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams " + urlParams);
    return urlParams.get(param);
}

function attachAuthorClickEvents() {
    const authorElements = document.querySelectorAll(".author-name");

    authorElements.forEach((authorElement) => {
        authorElement.addEventListener("click", async () => {
            const authorName = authorElement.textContent; // Get the author's name from the element
            try {
                const authorId = await findAuthor(authorName); // Wait for the author ID
                if (authorId) {
                    getBooksByAuthor(authorId); // Pass the ID to fetch books
                    updateDisplayTitle(`Books by "${authorName}"`);
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

// Function to handle search query and display books
function initializeSearchDisplay() {
    document.addEventListener("DOMContentLoaded", () => {
        const params = new URLSearchParams(window.location.search);
        const searchWord = params.get("search");
        // const heading = document.querySelector("h1.displayTitle");

        // If a search term exists, update the page and fetch books
        if (searchWord) {
            // heading.textContent = `Search result for "${searchWord}"`;
            updateDisplayTitle(`Search result for "${searchWord}"`);
            getSearchedBooks(searchWord);
        } else {
            // heading.textContent = `Random books`;
            updateDisplayTitle(`Random books`);
            getRandomBooks(15);
        }
    });
}

function updateDisplayTitle(message) {
    const heading = document.querySelector("h1.displayTitle");
    if (heading) {
        heading.textContent = message;
    } else {
        console.error("Heading element with class 'displayTitle' not found!");
    }
}

initializeSearchDisplay();