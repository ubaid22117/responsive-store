document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const cartButton = document.getElementById('cart-button');
    const cartDropdown = document.getElementById('cart-dropdown');
    const cartCount = document.getElementById('cart-count');
    const searchBar = document.getElementById('search-bar');

    let cart = [];

    // Fetch and display products
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('product');
                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.title}">
                    <h2>${product.title}</h2>
                    <div class="details">
                        <span>$${product.price}</span>
                        <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                    </div>
                    <span class="heart" onclick="toggleFavorite(this)">&#10084;</span>
                `;
                productContainer.appendChild(productElement);
            });
        });

    // Add to cart function
    window.addToCart = (id, title, price) => {
        const cartItem = { id, title, price };
        cart.push(cartItem);
        updateCart();
    };

    // Update cart display
    const updateCart = () => {
        const cartList = cartDropdown.querySelector('ul');
        cartList.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${item.title} - $${item.price}
                <button onclick="removeFromCart(${item.id})">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
        cartCount.textContent = cart.length;
    };

    // Remove from cart function
    window.removeFromCart = (id) => {
        cart = cart.filter(item => item.id !== id);
        updateCart();
    };

    // Toggle favorite function
    window.toggleFavorite = (element) => {
        element.classList.toggle('favorite');
    };

    // Search function
    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const products = productContainer.querySelectorAll('.product');
        products.forEach(product => {
            const title = product.querySelector('h2').textContent.toLowerCase();
            if (title.includes(searchTerm)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    });

    // Toggle cart dropdown visibility
    cartButton.addEventListener('click', () => {
        cartDropdown.style.display = cartDropdown.style.display === 'block' ? 'none' : 'block';
    });

    // Close cart dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartButton.contains(e.target) && !cartDropdown.contains(e.target)) {
            cartDropdown.style.display = 'none';
        }
    });
});
