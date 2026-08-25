// ==========================================================
// CONFIGURACIÓN - ClientManager Pro
// 1) Cambia entre pestañas (escritorio) / acordeón (celular).
//    Ambos controles usan el mismo atributo data-panel, así
//    que comparten la misma lógica de "mostrar/ocultar".
// 2) Vista previa de la foto de perfil con FileReader.
// 3) Botones "Guardar cambios": feedback simulado.
// ==========================================================

// ----- 1) Cambiar de panel -----
const disparadoresPanel = document.querySelectorAll('[data-panel]');
const paneles = document.querySelectorAll('.panel-config');

function mostrarPanel(nombrePanel) {
  // Marcamos como "activo" solo el disparador (pestaña o fila) que corresponde
  disparadoresPanel.forEach(function (disparador) {
    disparador.classList.toggle('activo', disparador.dataset.panel === nombrePanel);
  });

  // Mostramos solo el panel de contenido que corresponde
  paneles.forEach(function (panel) {
    panel.classList.toggle('activo', panel.dataset.panelContenido === nombrePanel);
  });
}

disparadoresPanel.forEach(function (disparador) {
  disparador.addEventListener('click', function () {
    mostrarPanel(disparador.dataset.panel);
  });
});

// ----- 2) Vista previa de la foto de perfil -----
const inputFoto = document.getElementById('input-foto');
const avatarGrande = document.getElementById('avatar-config-grande');
const avatarChico = document.getElementById('avatar-config-chico');

inputFoto.addEventListener('change', function () {
  const archivo = inputFoto.files[0];
  if (!archivo) return;

  // FileReader lee el archivo que el usuario eligió y nos da una URL
  // temporal para poder mostrarlo, sin necesidad de subirlo a ningún servidor.
  const lector = new FileReader();

  lector.onload = function (evento) {
    const urlImagen = `url(${evento.target.result})`;

    avatarGrande.style.backgroundImage = urlImagen;
    avatarGrande.textContent = ''; // quitamos las iniciales "AG"

    // También actualizamos el avatar pequeño de la versión móvil
    avatarChico.style.backgroundImage = urlImagen;
    avatarChico.style.backgroundSize = 'cover';
    avatarChico.style.backgroundPosition = 'center';
    avatarChico.textContent = '';
  };

  lector.readAsDataURL(archivo);
});

// ----- 3) Botones "Guardar cambios" -----
const botonesGuardar = document.querySelectorAll('.boton-guardar-config');

botonesGuardar.forEach(function (boton) {
  boton.addEventListener('click', function () {
    const textoOriginal = boton.textContent;
    boton.textContent = '✓ Guardado';
    boton.disabled = true;

    setTimeout(function () {
      boton.textContent = textoOriginal;
      boton.disabled = false;
    }, 1500);
  });
});
