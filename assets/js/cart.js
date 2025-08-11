/*
    -------------------------------------------
    Script para a página do carrinho (cart.html)
    Lida com a exibição, alteração de quantidade e remoção de itens.
    -------------------------------------------
*/

// Variáveis globais
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos do DOM
const cartItemsContainer = document.getElementById('cart-items');
const cartSummaryContainer = document.getElementById('cart-summary');
const subtotalPriceSpan = document.getElementById('subtotal-price');
const totalPriceSpan = document.getElementById('total-price');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartCounterHeader = document.getElementById('cart-counter');

// --- Funções de Ajuda ---
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- Funções Principais ---

// Renderiza a lista de itens no carrinho
const renderCart = () => {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
        cartSummaryContainer.classList.add('hidden');
        emptyCartMessage.classList.remove('hidden');
    } else {
        cartSummaryContainer.classList.remove('hidden');
        emptyCartMessage.classList.add('hidden');

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <img src="${item.images[0]}" alt="${item.title}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.title}</h3>
                    <p class="price">${formatPrice(item.price)}</p>
                    <button class="remove-btn" data-id="${item.id}">Remover</button>
                </div>
                <div class="cart-item-controls">
                    <div class="quantity-control">
                        <input type="number" value="${item.quantity}" min="1" max="${item.stock}" data-id="${item.id}" class="quantity-input">
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });
    }

    updateCartSummary();
};

// Atualiza o resumo do carrinho (subtotal e total)
const updateCartSummary = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal; // Simplesmente o subtotal, sem frete por enquanto.

    subtotalPriceSpan.textContent = formatPrice(subtotal);
    totalPriceSpan.textContent = formatPrice(total);
};

// Salva o carrinho no localStorage
const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Atualiza o contador de itens no cabeçalho
const updateCartCounter = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCounterHeader) {
        cartCounterHeader.textContent = totalItems;
    }
};

// Lida com a remoção de um item do carrinho
const removeItem = (productId) => {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
    updateCartCounter();
};

// Lida com a atualização da quantidade de um item
const updateQuantity = (productId, newQuantity) => {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = parseInt(newQuantity, 10);
        if (item.quantity <= 0) {
            removeItem(productId);
        } else {
            saveCart();
            updateCartSummary();
            updateCartCounter();
        }
    }
};

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateCartCounter();
});

cartItemsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
        const productId = e.target.dataset.id;
        if (confirm('Tem certeza que deseja remover este item?')) {
            removeItem(productId);
        }
    }
});

cartItemsContainer.addEventListener('change', (e) => {
    if (e.target.classList.contains('quantity-input')) {
        const productId = e.target.dataset.id;
        const newQuantity = e.target.value;
        updateQuantity(productId, newQuantity);
    }
});