// Paints the _footer.html into the footer-container footer
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');

    fetch('./views/_footer.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch footer');
            }
            return response.text();
        })
        .then(html => {
            footerContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading footer:', error));
});