
// Fetch and display a specific book by ID
async function getSpecificBook() {
    const bookId = 1; // Example book ID
    const url = `${baseUrl}/books/${bookId}`; // Correct template literal
    try {
        const book = await fetchData(url);
        console.log("Fetched book:", book);
    } catch (error) {
        console.error("Failed to fetch specific book:", error.message);
    }
}