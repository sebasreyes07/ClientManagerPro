// ==========================================================
// NOTIFICACIONES - ClientManager Pro
// Permite marcar cuál canal está activo/configurado
// (Correo electrónico o WhatsApp). El historial de abajo
// NO se filtra: sigue mostrando siempre todos los envíos,
// tal como se ve en el diseño original.
// ==========================================================

const tarjetasCanal = document.querySelectorAll('.tarjeta-canal');

tarjetasCanal.forEach(function (tarjeta) {
  tarjeta.addEventListener('click', function () {
    // Quitamos "activo" de todas las tarjetas...
    tarjetasCanal.forEach(function (t) {
      t.classList.remove('activo');
    });
    // ...y se lo ponemos solo a la que se acaba de tocar
    tarjeta.classList.add('activo');
  });
});
