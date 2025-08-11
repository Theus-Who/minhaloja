/*
    -------------------------------------------
    Script para a página de checkout (checkout.html)
    Lida com a validação do formulário e resumo do pedido.
    -------------------------------------------
*/

// Variáveis globais
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Elementos do DOM
const checkoutForm = document.getElementById('checkout-form');
const checkoutItemsList = document.getElementById('checkout-items-list');
const checkoutTotalPriceSpan = document.getElementById('checkout-total-price');
const orderSuccessMessage = document.getElementById('order-success-message');

// --- Funções de Ajuda ---
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- Funções Principais ---

// Renderiza os itens do carrinho no resumo do checkout
const renderCheckoutSummary = () => {
    if (cart.length === 0) {
        // Redireciona para o carrinho se estiver vazio
        window.location.href = 'cart.html';
        return;
    }

    checkoutItemsList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <span>${item.title} (x${item.quantity})</span>
            <span>${formatPrice(itemTotal)}</span>
        `;
        checkoutItemsList.appendChild(listItem);
    });

    checkoutTotalPriceSpan.textContent = formatPrice(total);
};

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    renderCheckoutSummary();
});

checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Simulação de validação
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const card = document.getElementById('card-number').value;

    if (!name || !address || !card) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    // Processo de pagamento simulado
    console.log('Dados do pedido:', {
        name,
        address,
        cart
    });

    // Limpa o carrinho no localStorage
    localStorage.removeItem('cart');

    // Esconde o formulário e mostra a mensagem de sucesso
    checkoutForm.classList.add('hidden');
    orderSuccessMessage.classList.remove('hidden');
});