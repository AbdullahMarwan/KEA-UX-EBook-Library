
/*--------------------------------------------------------------
------------------------- ADD NEW BOOK -------------------------------
--------------------------------------------------------------*/
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
    fetch('http://localhost:8080/admin/books', {
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

/*--------------------------------------------------------------
------------------------- ADD NEW AUTHOR -----------------------
--------------------------------------------------------------*/
document.querySelector('#submit-author-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;


    // Prepare FormData
    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);

    // Send data to backend
    fetch('http://localhost:8080/admin/authors', {
        method: 'POST',
        body: formData // Send FormData directly
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add author');
        }
        return response.json();
    })
    .then(data => {
        console.log('Author added:', data);
        alert('Author added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add author. Please check the console for details.');
    });
});

/*--------------------------------------------------------------
------------------------- ADD NEW PUBLISHER --------------------
--------------------------------------------------------------*/
document.querySelector('#submit-publisher-btn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect form data
    const publisherName = document.getElementById("publisher").value;

    // Prepare FormData
    const formData = new FormData();
    formData.append('name', publisherName);

    // Send data to backend
    fetch('http://localhost:8080/admin/publishers', {
        method: 'POST',
        body: formData // Send FormData directly
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add publisher');
        }
        return response.json();
    })
    .then(data => {
        console.log('Publisher added:', data);
        alert('Publisher added successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to add publisher. Please check the console for details.');
    });
});
