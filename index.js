document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'https://products-api-2ttf.onrender.com/api/products';
    const productsContainer = document.getElementById('productsContainer');
    const searchInput = document.getElementById('searchInput');

    // Function to fetch and display products
    async function fetchProducts() {
        try {
            const response = await fetch(apiUrl);
            const products = await response.json();
            displayProducts(products.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to display products
    function displayProducts(products) {
        productsContainer.innerHTML = ''; // Clear previous products

        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            // Display product details
            const productTitle = document.createElement('h1');
            productTitle.textContent = product.product_title;

            const badge = document.createElement('span');
            badge.classList.add('badge');
            badge.textContent = product.product_badge;

            // Update image and container styling
            const productImageDiv = document.createElement('div');
            productImageDiv.classList.add('productImageContainer');

            const productImage = document.createElement('img');
            productImage.classList.add('productImage');
            productImage.setAttribute('src', product.product_image);
            productImage.setAttribute('alt', product.product_title);

            productImageDiv.appendChild(productImage);
            productImageDiv.appendChild(badge);

            const productDetailsDiv = document.createElement('div');
            productDetailsDiv.appendChild(productTitle);

            // Display product variants
            const variantsList = document.createElement('ul');
            product.product_variants.forEach(variantObj => {
                Object.values(variantObj).forEach(value => {
                    const variantItem = document.createElement('li');
                    variantItem.textContent = value;
                    variantsList.appendChild(variantItem);
                });
            });

            productDetailsDiv.appendChild(variantsList);
            productDiv.appendChild(productImageDiv);
            productDiv.appendChild(productDetailsDiv);

            productsContainer.appendChild(productDiv);
        });
    }

    // Event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const productDivs = productsContainer.getElementsByClassName('product');

        Array.from(productDivs).forEach(productDiv => {
            const title = productDiv.querySelector('h1').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                productDiv.style.display = 'block';
            } else {
                productDiv.style.display = 'none';
            }
        });
    });

    // Fetch products on page load
    fetchProducts();   
});

