// ==========================================================
// DASHBOARD - ClientManager Pro
// Maneja el menú lateral deslizante en pantallas de celular.
// En pantallas grandes la barra lateral siempre está visible,
// así que este código no afecta nada ahí.
// ==========================================================

const botonMenuMovil = document.getElementById('boton-menu-movil');
const barraLateral = document.getElementById('barra-lateral');
const overlayMenu = document.getElementById('overlay-menu');

// Al tocar el ícono de hamburguesa, mostramos el menú
botonMenuMovil.addEventListener('click', function () {
  barraLateral.classList.add('abierta');
  overlayMenu.classList.add('visible');
});

// Al tocar el fondo oscuro (fuera del menú), lo cerramos
overlayMenu.addEventListener('click', function () {
  barraLateral.classList.remove('abierta');
  overlayMenu.classList.remove('visible');
});
