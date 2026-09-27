document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.burger-btn');
  const navMenu = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!burgerBtn || !navMenu) return;

  function toggleBurger() {
    burgerBtn.classList.toggle('burger-btn--active');
    navMenu.classList.toggle('nav--active');
    document.body.classList.toggle('no-scroll');
  }

  function closeBurger() {
    burgerBtn.classList.remove('burger-btn--active');
    navMenu.classList.remove('nav--active');
    document.body.classList.remove('no-scroll');
  }

  // Клик по кнопке бургер
  burgerBtn.addEventListener('click', toggleBurger);

  // Закрытие при клике на любую ссылку навигации
  navLinks.forEach(link => {
    link.addEventListener('click', closeBurger);
  });

  // Закрытие по клавише Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeBurger();
  });

  // Закрытие при увеличении экрана > 768px
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeBurger();
  });
});