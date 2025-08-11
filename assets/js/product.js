/*
    -------------------------------------------
    Script para a página de detalhes do produto (product.html)
    Lida com a renderização dinâmica do produto e galeria de imagens.
    -------------------------------------------
*/

// Variáveis globais
let products = [];
let currentProduct = null;

// Elementos do DOM
const productDetailsContainer = document.getElementById('product-details');
const breadcrumbCategory = document.getElementById('breadcrumb-category');
const breadcrumbProduct = document.getElementById('breadcrumb-product');
const relatedProductsGrid = document.getElementById('related-products-grid');

// Carrega os dados dos produtos e inicializa a página
const initializeProductPage = async () => {
    try {
        const response = await fetch('./js/products.json');
        const data = await response.json();
        products = data.products;

        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (productId) {
            currentProduct = products.find(p => p.id === productId);
            if (currentProduct) {
                renderProductDetails(currentProduct);
                renderRelatedProducts(currentProduct.category, currentProduct.id);
                updateCartCounter();
            } else {
                productDetailsContainer.innerHTML = '<p>Produto não encontrado.</p>';
            }
        } else {
            productDetailsContainer.innerHTML = '<p>Nenhum produto especificado.</p>';
        }

    } catch (error) {
        console.error('Erro ao carregar os dados do produto:', error);
        productDetailsContainer.innerHTML = '<p>Erro ao carregar detalhes do produto. Tente novamente mais tarde.</p>';
    }
};

// Renderiza os detalhes do produto na página
const renderProductDetails = (product) => {
    // Atualiza o breadcrumb
    breadcrumbCategory.textContent = product.category;
    breadcrumbProduct.textContent = product.title;

    productDetailsContainer.innerHTML = `
        <div class="product-images">
            <img src="${product.images[0]}" alt="Imagem principal de ${product.title}" class="main-image" id="main-image">
            <div class="thumbnail-gallery" id="thumbnail-gallery">
                ${product.images.map((image, index) => `
                    <img src="${image}" alt="Miniatura ${index + 1} de ${product.title}" class="thumbnail" data-index="${index}">
                `).join('')}
            </div>
        </div>
        <div class="product-info">
            <h1>${product.title}</h1>
            <div class="product-rating">
                ${generateRatingStars(product.rating)}
                <span class="rating-text">(${product.rating})</span>
            </div>
            <p class="product-price">${formatPrice(product.price)}</p>
            <p class="product-description">${product.description}</p>
            <div class="product-options">
                <label for="quantity">Quantidade:</label>
                <input type="number" id="quantity" value="1" min="1" max="${product.stock}">
            </div>
            <button class="add-to-cart-btn" id="add-to-cart-btn" data-id="${product.id}">Adicionar ao Carrinho</button>
        </div>
    `;

    // Adiciona evento de clique nas miniaturas
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    const mainImage = document.getElementById('main-image');
    thumbnailGallery.addEventListener('click', (e) => {
        if (e.target.classList.contains('thumbnail')) {
            mainImage.src = e.target.src;
            // Remove a classe 'active' de todas as miniaturas
            thumbnailGallery.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            // Adiciona a classe 'active' à miniatura clicada
            e.target.classList.add('active');
        }
    });

    // Adiciona evento de clique no botão "Adicionar ao Carrinho"
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        const quantityInput = document.getElementById('quantity');
        const quantity = parseInt(quantityInput.value, 10);
        if (quantity > 0) {
            addToCart(product, quantity);
            alert(`${quantity} unidade(s) de ${product.title} adicionada(s) ao carrinho!`);
        } else {
            alert('A quantidade deve ser maior que zero.');
        }
    });
};

// Renderiza produtos relacionados
const renderRelatedProducts = (category, currentProductId) => {
    const related = products.filter(p => p.category === category && p.id !== currentProductId);
    relatedProductsGrid.innerHTML = ''; // Limpa o grid
    // Limita a 4 produtos relacionados
    related.slice(0, 4).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <a href="product.html?id=${product.id}">
                <img src="${product.images[0]}" alt="${product.title}" class="product-card-image">
            </a>
            <a href="product.html?id=${product.id}">
                <h3 class="product-card-title">${product.title}</h3>
            </a>
            <p class="product-card-price">${formatPrice(product.price)}</p>
        `;
        relatedProductsGrid.appendChild(card);
    });
};

// --- Funções de Ajuda (repetidas para garantir a independência da página) ---
const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const generateRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    let starsHtml = '';
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<svg><use xlink:href="#icon-star"></use></svg>';
    }
    return `<div class="stars-container">${starsHtml}</div>`;
};

// --- Funções do Carrinho (compartilhadas) ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

const updateCartCounter = () => {
    const counter = document.getElementById('cart-counter');
    if (counter) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        counter.textContent = totalItems;
    }
};

const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity: quantity });
    }
    saveCart();
    updateCartCounter();
};

// Inicializa a página
document.addEventListener('DOMContentLoaded', initializeProductPage);