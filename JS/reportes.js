// ==========================================================
// REPORTES - ClientManager Pro
// 1) Las pestañas (Vencimientos, Pagos, etc.) SÍ filtran
//    de verdad las filas de la tabla/lista de la derecha.
// 2) El botón "Exportar" es una simulación (todavía no hay
//    backend), solo muestra un mensaje de confirmación.
// ==========================================================

const pestanas = document.querySelectorAll('.tab-categoria');
const filas = document.querySelectorAll('.fila-reporte');
const mensajeVacio = document.getElementById('mensaje-vacio');

pestanas.forEach(function (pestana) {
  pestana.addEventListener('click', function () {

    // Marcamos visualmente cuál pestaña está activa
    pestanas.forEach(function (p) {
      p.classList.remove('activo');
    });
    pestana.classList.add('activo');

    const categoria = pestana.dataset.categoria;
    let hayResultados = false;

    // Mostramos u ocultamos cada fila según la categoría elegida
    filas.forEach(function (fila) {
      const coincide = categoria === 'todas' || fila.dataset.tipo === categoria;
      fila.classList.toggle('oculto', !coincide);
      if (coincide) {
        hayResultados = true;
      }
    });

    // Si ninguna fila coincide, mostramos el mensaje de "sin resultados"
    mensajeVacio.style.display = hayResultados ? 'none' : 'block';
  });
});

// Botón "Exportar" (simulado)
const botonExportar = document.getElementById('boton-exportar');
botonExportar.addEventListener('click', function () {
  const textoOriginal = botonExportar.textContent;
  botonExportar.textContent = 'Exportando...';
  botonExportar.disabled = true;

  // Simulamos que el archivo tarda un momento en generarse
  setTimeout(function () {
    botonExportar.textContent = textoOriginal;
    botonExportar.disabled = false;
    console.log('Exportación simulada (aquí luego se generaría el PDF/Excel real).');
  }, 1200);
});
