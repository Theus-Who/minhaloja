/*
    -------------------------------------------
    Script principal para a página index.html
    Lida com o carrossel, listagem de produtos, busca e filtros.
    -------------------------------------------
*/

// Carrega o JSON de produtos
let products = [];
let currentPage = 1;
const productsPerPage = 8;
let allCategories = [];

// Elementos do DOM
const productGridContainer = document.getElementById('product-grid-container');
const categoryList = document.getElementById('category-list');
const categoryFilter = document.getElementById('category-filter');
const priceSort = document.getElementById('price-sort');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
const loadMoreBtn = document.getElementById('load-more-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const menuToggle = document.getElementById('menu-toggle');
const closeSidebar = document.getElementById('close-sidebar');
const sidebarMenu = document.getElementById('sidebar-menu');

// --- Funções de Ajuda ---

// Função para formatar o preço para BRL
const formatPrice = (price) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// Função para gerar as estrelas de avaliação
const generateRatingStars = (rating) => {
  const fullStars = Math.floor(rating);
  let starsHtml = '';
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<svg><use xlink:href="#icon-star"></use></svg>';
  }
  return `<div class="stars-container">${starsHtml}</div>`;
};

// --- Funções Principais de Renderização ---

// Função para renderizar um card de produto
const renderProductCard = (product) => {
  const card = document.createElement('div');
  card.className = 'product-card';
  card.innerHTML = `
        <a href="product.html?id=${
          product.id
        }" aria-label="Ver detalhes do produto ${product.title}">
            <img loading="lazy" src="${product.images[0]}" alt="Imagem de ${
    product.title
  }" class="product-card-image">
        </a>
        <h3 class="product-card-title">${product.title}</h3>
        <div class="product-card-rating">
            ${generateRatingStars(product.rating)}
            <span class="rating-text">(${product.rating})</span>
        </div>
        <p class="product-card-price">${formatPrice(product.price)}</p>
        <button class="product-card-add-to-cart" data-id="${
          product.id
        }">Adicionar ao Carrinho</button>
    `;
  return card;
};

// Função para renderizar a lista de produtos
const renderProductGrid = (productsToRender) => {
  productsToRender.forEach((product) => {
    const productCard = renderProductCard(product);
    productGridContainer.appendChild(productCard);
  });
};

// Função para carregar mais produtos (paginação)
const loadMoreProducts = () => {
  currentPage++;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const productsToRender = filteredProducts.slice(startIndex, endIndex);

  renderProductGrid(productsToRender);

  if (endIndex >= filteredProducts.length) {
    loadMoreBtn.classList.add('hidden');
  }
};

// Função para inicializar o catálogo de produtos
const initializeCatalog = () => {
  loadingSpinner.classList.remove('hidden');
  try {
    // Acessa a variável global diretamente
    products = productsData.products;

    // Extrai categorias únicas
    allCategories = [...new Set(products.map((p) => p.category))];

    renderCategoryFilters();
    applyFiltersAndSort();
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    productGridContainer.innerHTML =
      '<p>Erro ao carregar produtos. Tente novamente mais tarde.</p>';
  } finally {
    loadingSpinner.classList.add('hidden');
  }
};

// Função para renderizar os filtros de categoria
const renderCategoryFilters = () => {
  allCategories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });
  // Renderiza também no menu lateral
  allCategories.forEach((category) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" data-category="${category}">${category}</a>`;
    categoryList.appendChild(listItem);
  });
};

// Função para aplicar filtros e ordenação
let filteredProducts = [];
const applyFiltersAndSort = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;
  const sortOrder = priceSort.value;

  filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm) ||
      product.shortDescription.toLowerCase().includes(searchTerm);
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortOrder === 'asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  productGridContainer.innerHTML = '';
  currentPage = 1;
  renderProductGrid(filteredProducts.slice(0, productsPerPage));

  if (filteredProducts.length > productsPerPage) {
    loadMoreBtn.classList.remove('hidden');
  } else {
    loadMoreBtn.classList.add('hidden');
  }
};

// --- Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
  initializeCatalog();
  updateCartCounter();
});

// Evento para o carrossel
const carouselContainer = document.getElementById('carousel-container');
const carouselPrev = document.querySelector('.carousel-prev');
const carouselNext = document.querySelector('.carousel-next');
const carouselDotsContainer = document.getElementById('carousel-dots');
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;
let carouselInterval;

const createDots = () => {
  slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
    carouselDotsContainer.appendChild(dot);
  });
};

const updateDots = (index) => {
  document.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
};

const goToSlide = (index) => {
  currentSlide = index;
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots(currentSlide);
};

const nextSlide = () => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
};

const startCarousel = () => {
  carouselInterval = setInterval(nextSlide, 5000);
};

const stopCarousel = () => {
  clearInterval(carouselInterval);
};

if (carouselContainer) {
  createDots();
  startCarousel();

  carouselContainer.addEventListener('mouseenter', stopCarousel);
  carouselContainer.addEventListener('mouseleave', startCarousel);
  carouselPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(currentSlide);
    stopCarousel();
    startCarousel();
  });
  carouselNext.addEventListener('click', () => {
    nextSlide();
    stopCarousel();
    startCarousel();
  });
}

// Eventos para filtros, busca e ordenação
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  applyFiltersAndSort();
});
categoryFilter.addEventListener('change', applyFiltersAndSort);
priceSort.addEventListener('change', applyFiltersAndSort);

// Evento para o botão de "Carregar Mais"
loadMoreBtn.addEventListener('click', loadMoreProducts);

// Evento para o menu lateral
menuToggle.addEventListener('click', () => {
  sidebarMenu.classList.add('open');
});

closeSidebar.addEventListener('click', () => {
  sidebarMenu.classList.remove('open');
});

// Fecha o menu lateral se clicar fora
document.addEventListener('click', (e) => {
  if (!sidebarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    sidebarMenu.classList.remove('open');
  }
});

// Evento de click para adicionar ao carrinho
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('product-card-add-to-cart')) {
    const productId = e.target.dataset.id;
    const productToAdd = products.find((p) => p.id === productId);
    if (productToAdd) {
      addToCart(productToAdd);
      alert(`${productToAdd.title} adicionado ao carrinho!`);
    }
  }
});

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

const addToCart = (product) => {
  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCounter();
};