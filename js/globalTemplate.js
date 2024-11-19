// Paints the _header.html into the header-container header
document.addEventListener('DOMContentLoaded', () => {
    const headerContainer = document.querySelector('.header-container');

    fetch('./views/_header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch header');
            }
            return response.text();
        })
        .then(html => {
            headerContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading header:', error));
});

// Paints the _footer.html into the footer-container footer
document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.querySelector('.footer-container');

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