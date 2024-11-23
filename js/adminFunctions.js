/* admin login / verification */

const adminEmail = "admin.library@mail.com"
const adminPassword = "WebUdvikling24!"


document.querySelector("#admin-login-btn").addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    const adminEmailInput = document.querySelector("#admin-email").value;
    const adminPasswordInput = document.querySelector("#admin-password").value;

    if (adminEmail === adminEmailInput && adminPassword === adminPasswordInput) {
        window.location.href = "http://www.w3schools.com";
    } else {
        alert("forkerte oplysninger")
    }
    
    
    
    console.log(adminEmailInput, adminPasswordInput)

})


function addBook() {
    /* add new book */

    document.querySelector('#submit-book-btn').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Collect form data
        const title = document.getElementById("title").value;
        const authorId = document.getElementById("author_id").value; // ID must match backend's expected `author_id`
        const publishingYear = document.getElementById("publishing_year").value;
        const publisherId = document.getElementById("publisher_id").value;

        // Prepare FormData
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author_id', authorId);
        formData.append('publishing_year', publishingYear);
        formData.append('publisher_id', publisherId);

        // Send data to backend
        fetch('/admin/books', {
            method: 'POST',
            body: formData // Send FormData directly
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add book');
            }
            return response.json();
        })
        .then(data => {
            console.log('Book added:', data);
            alert('Book added successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add book. Please check the console for details.');
        });
    });

}