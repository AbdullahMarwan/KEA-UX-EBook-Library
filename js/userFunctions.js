document.querySelector(".edit-profile-btn").addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    // Retrieve logged-in user ID from session storage
    const userId = sessionStorage.getItem("userId");

    //Check if userId exists (user is logged in)
    if (!userId) {
        alert("You must be logged in to edit your information.");
        return; // Stop further execution of the function
    }

    // Get values from the forms
    const email = document.getElementById("email").value;
    const first_name = document.getElementById("first_name").value;
    const last_name = document.getElementById("last_name").value;
    const address = document.getElementById("address").value;
    const phone_number = document.getElementById("phone_number").value;
    const birth_date = document.getElementById("birth_date").value;

    const formData = new FormData();
    formData.append("email", email);
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("address", address); // TODO: VIRKER IKKE 
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


document.addEventListener("DOMContentLoaded", () => {
    const userId = sessionStorage.getItem("userId");

    fetch(`http://localhost:8080/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            return response.json();
        })
        .then((data) => {
            console.log("User data retrieved:", data); // Log the fetched data
            const your_name = document.getElementById("your-name-title");
            your_name.textContent = data.first_name
            // Set values for the corresponding input fields
            const user = [
                { id: "email", value: data.email },
                { id: "first_name", value: data.first_name },
                { id: "last_name", value: data.last_name },
                { id: "address", value: data.address },
                { id: "phone_number", value: data.phone_number },
                { id: "birth_date", value: data.birth_date },
            ];
            
            console.log(data.address)
            user.forEach(({ id, value }) => {
                const input = document.getElementById(id);
                if (input && value) {
                    input.value = value; // Set the input field's value
                    console.log(`Input value set for #${id}:`, value);
                } else {
                    console.error(`Input element for #${id} not found or value missing.`);
                }
            });
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });
});





// email.textContent = data.email