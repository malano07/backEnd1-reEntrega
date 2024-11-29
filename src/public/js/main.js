const socket = io();

function addToCart(productId, cartId) {
    fetch(`/carts/${cartId}/product/${productId}`, { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => alert('Producto agregado al carrito'))
        .catch(error => console.error('Error:', error));
}


        



async function loadProductDetails() {
    const productDetails = document.getElementById('product-details');
    const productId = window.location.pathname.split('/').pop();

    try {
        const response = await fetch(`/products/${productId}`);
        const product = await response.json();

        productDetails.innerHTML = `
            <h1>${product.title}</h1>
            <img src="${product.thumbnails[0]}" alt="${product.title}" style="max-width: 300px;">
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Stock Disponible:</strong> ${product.stock}</p>
            <p><strong>Código:</strong> ${product.code}</p>
            <button id="add-to-cart">Agregar al Carrito</button>
        `;
    } catch (error) {
        console.error('Error al cargar el producto:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    const path = window.location.pathname;

    if (path.startsWith('/products/')) {
        await loadProductDetails();
    }
});

