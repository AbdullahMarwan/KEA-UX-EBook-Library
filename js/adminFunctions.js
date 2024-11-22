
/* admin add book function */
document.querySelector('#submit-book-btn').addEventListener('click', function(event) {
    const title = document.getElementById("book-title").value
    const author = document.getElementById("author").value
    const publisher = document.getElementById("publisher").value
    const publishingYear = document.getElementById("publishing-year").value
    event.preventDefault(); // Prevent the default form submission behavior
    console.log(title, author, publisher, publishingYear ); // Log "works" to the console
});


/* admin login / verification */

const adminEmail =
const adminPassword =