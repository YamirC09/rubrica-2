// Cargar productos de la API
const loadProducts = async () => {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        const limitedProducts = products.slice(0, 15);
        displayProducts(limitedProducts);
        populateFilter(limitedProducts);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
};

// Mostrar productos en el contenedor de cards
const displayProducts = products => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    products.forEach(product => {
        const card = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">$${product.price}</p>
                </div>
            </div>
        `;
        cardContainer.insertAdjacentHTML('beforeend', card);
    });
};

// Poblar el filtro de productos
const populateFilter = products => {
    const productFilter = document.getElementById('productFilter');
    products.forEach(product => {
        const option = `<option value="${product.title}">${product.title}</option>`;
        productFilter.insertAdjacentHTML('beforeend', option);
    });

    productFilter.addEventListener('change', event => {
        const selectedProduct = event.target.value;
        if (selectedProduct === 'all') {
            displayProducts(products);
        } else {
            const filteredProducts = products.filter(product => product.title === selectedProduct);
            displayProducts(filteredProducts);
        }
    });
};

// Inicializar
loadProducts();
