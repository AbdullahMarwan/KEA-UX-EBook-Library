document.querySelector(".edit-profile-btn").addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Retrieve logged-in user ID from session storage
    const userId = sessionStorage.getItem("userId");

    // NEW: Check if userId exists (user is logged in)
    if (!userId) {
        alert("You must be logged in to edit your information.");
        return; // Stop further execution of the function
    }

    // Get values from the forms
    const email = document.getElementById("email").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const adress = document.getElementById("adress").value;
    const phone_number = document.getElementById("phone_number").value;
    const birth_date = document.getElementById("birth_date").value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("adress", adress); // TODO: VIRKER IKKE 
    formData.append("phone_number", phone_number);
    formData.append("birth_date", birth_date);

    // Put info into the database
    fetch(`http://localhost:8080/users/${userId}`, {
        method: "PUT",
        body: formData, // Send FormData directly
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to edit information");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Information edited:", data);
            alert("Edit added successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to edit. Please check the console for details.");
        });
});
 