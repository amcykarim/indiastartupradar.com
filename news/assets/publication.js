(function () {
  const button = document.querySelector('[data-menu-toggle]');
  const navigation = document.querySelector('[data-primary-nav]');

  if (!button || !navigation) return;

  button.addEventListener('click', function () {
    const isOpen = navigation.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });
}());
