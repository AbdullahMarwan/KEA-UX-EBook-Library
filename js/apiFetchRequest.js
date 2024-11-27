// Base url used to by every fetch request
export const baseUrl = "http://localhost:8080";

// General reusable fetchData function 
export async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error; // Re-throw the error for the caller to handle
    }
}