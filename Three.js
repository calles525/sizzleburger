
(function() {
  const container = document.getElementById('threejs-container-ANIMATION_215');
  const devicePixelRatio = window.devicePixelRatio || 1;
  // Simple Cart Management System
let cart = JSON.parse(localStorage.getItem('sizzle_cart')) || [];

// Update Cart Count in Header
function updateCartCount() {
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        countElement.innerText = totalItems;
    }
}

// Add Product to Cart
function addToCart(id, name, price, image) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }
    
    saveCart();
    updateCartCount();
    alert(`${name} añadido al carrito!`);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('sizzle_cart', JSON.stringify(cart));
}

// Render Cart on cart.html
function renderCart() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalElement.innerText = '$0.00';
        return;
    }
    
    let html = '';
    let total = 0;
    
    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;
        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="80">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="changeQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity('${item.id}', 1)">+</button>
                </div>
                <p>$${subtotal.toFixed(2)}</p>
                <button onclick="removeItem('${item.id}')">Eliminar</button>
            </div>
        `;
    });
    
    cartContainer.innerHTML = html;
    totalElement.innerText = `$${total.toFixed(2)}`;
}

function changeQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeItem(id);
        } else {
            saveCart();
            renderCart();
            updateCartCount();
        }
    }
}

function removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    renderCart();
    updateCartCount();
}

// Initializations
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    if (window.location.pathname.includes('carrito.html')) {
        renderCart();
    }
});

})();

