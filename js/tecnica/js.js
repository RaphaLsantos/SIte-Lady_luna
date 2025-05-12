// Ativar item do menu lateral
const menuLinks = document.querySelectorAll('.menu a');
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// Mostrar/ocultar formulário ao clicar no botão
const btnNovaFicha = document.querySelector('.new-btn');
const formSection = document.querySelector('.form-section');
btnNovaFicha.addEventListener('click', () => {
  formSection.classList.toggle('show');
  if (formSection.classList.contains('show')) {
    formSection.scrollIntoView({ behavior: 'smooth' });
  }
});

// Animação ao exibir cards
const cards = document.querySelectorAll('.card');
window.addEventListener('load', () => {
  cards.forEach((card, i) => {
    setTimeout(() => {
      card.classList.add('visible');
    }, 100 * i);
  });
});
