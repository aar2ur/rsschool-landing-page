// js/slider.js
const slides = [
  { title: "S'mores Latte", text: "Chocolate syrup, toasted marshmallow, espresso, whipped cream", price: "$5.50", icon: "☕" },
  { title: "Caramel Macchiato", text: "Espresso with steamed milk and rich caramel drizzle", price: "$5.00", icon: "🍯" },
  { title: "Ice Cappuccino", text: "Espresso with cold milk, crushed ice and cocoa powder", price: "$4.50", icon: "🧊" }
];

let currentIndex = 0;
let isAnimating = false;

const sliderCard = document.querySelector('.slider__card');
const slideImage = document.querySelector('.slider__image');
const slideTitle = document.querySelector('.slider__title');
const slideText = document.querySelector('.slider__text');
const slidePrice = document.querySelector('.slider__price');
const prevBtn = document.querySelector('.slider__btn--prev');
const nextBtn = document.querySelector('.slider__btn--next');

function changeSlide(newIndex) {
  if (isAnimating || !sliderCard) return;
  isAnimating = true;

  // 1. Плавно растворяем текущий слайд
  sliderCard.classList.add('slider__card--fade');

  // 2. Ждем окончания эффекта растворения (200ms) и меняем данные
  setTimeout(() => {
    currentIndex = newIndex;
    const item = slides[currentIndex];

    slideImage.textContent = item.icon;
    slideTitle.textContent = item.title;
    slideText.textContent = item.text;
    slidePrice.textContent = item.price;

    // 3. Плавно проявляем новый слайд
    sliderCard.classList.remove('slider__card--fade');
    
    setTimeout(() => {
      isAnimating = false;
    }, 200);
  }, 200);
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    changeSlide(newIndex);
  });

  nextBtn.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % slides.length;
    changeSlide(newIndex);
  });
}