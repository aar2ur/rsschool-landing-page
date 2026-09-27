// js/menu.js
let productsData = [];
let currentCategory = 'coffee';
let activeProduct = null;

const grid = document.querySelector('.menu__grid');
const tabs = document.querySelectorAll('.tab-btn');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Модальное окно
const modal = document.querySelector('.modal');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalCloseBtn = document.querySelector('.modal__close');

async function initMenu() {
  try {
    const res = await fetch('products.json');
    productsData = await res.json();
    renderCategory(currentCategory);
  } catch (e) {
    console.error("Error loading products:", e);
  }
}

function renderCategory(category) {
  currentCategory = category;
  const filtered = productsData.filter(item => item.category === category);
  const isMobile = window.innerWidth <= 768;
  const itemsToDisplay = isMobile ? filtered.slice(0, 4) : filtered;

  grid.innerHTML = '';
  itemsToDisplay.forEach(product => {
    grid.appendChild(createCard(product));
  });

  if (loadMoreBtn) {
    if (isMobile && filtered.length > 4 && itemsToDisplay.length < filtered.length) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
    }
  }
}

function createCard(product) {
  const card = document.createElement('article');
  card.className = 'menu-card';
  card.innerHTML = `
    <div class="menu-card__image">☕</div>
    <div class="menu-card__content">
      <h3 class="menu-card__title">${product.name}</h3>
      <p class="menu-card__text">${product.description}</p>
      <div class="menu-card__price">$${product.price}</div>
    </div>
  `;
  card.addEventListener('click', () => openModal(product));
  return card;
}

// Табы категорий
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    tabs.forEach(t => t.classList.remove('tab-btn--active'));
    e.target.classList.add('tab-btn--active');
    const cat = e.target.textContent.toLowerCase().includes('tea') ? 'tea' :
                e.target.textContent.toLowerCase().includes('dessert') ? 'dessert' : 'coffee';
    renderCategory(cat);
  });
});

// Кнопка Load More
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const filtered = productsData.filter(item => item.category === currentCategory);
    grid.innerHTML = '';
    filtered.forEach(product => grid.appendChild(createCard(product)));
    loadMoreBtn.style.display = 'none';
  });
}

// Пересчет цены в модальном окне
function updateModalPrice() {
  if (!activeProduct) return;
  let total = parseFloat(activeProduct.price);

  const selectedSize = document.querySelector('.size-btn--active');
  if (selectedSize) {
    total += parseFloat(selectedSize.dataset.addPrice || 0);
  }

  const selectedAdditives = document.querySelectorAll('.additive-btn--active');
  selectedAdditives.forEach(add => {
    total += parseFloat(add.dataset.addPrice || 0);
  });

  document.querySelector('.modal__total-price').textContent = `$${total.toFixed(2)}`;
}

function openModal(product) {
  activeProduct = product;
  document.body.classList.add('no-scroll');
  modal.classList.add('modal--active');

  // Заполнение данных модалки из объекта
  document.querySelector('.modal__title').textContent = product.name;
  document.querySelector('.modal__text').textContent = product.description;
  
  // Генерация кнопок размеров и добавок с событием клика
  // ... (рендер элементов с вызовом updateModalPrice())
  
  updateModalPrice();
}

function closeModal() {
  document.body.classList.remove('no-scroll');
  modal?.classList.remove('modal--active');
}

modalCloseBtn?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

window.addEventListener('resize', () => renderCategory(currentCategory));
if (grid) initMenu();