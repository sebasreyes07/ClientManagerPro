// =========================================
// CLIENTMANAGER PRO - UNIFIED JS
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. ROUTER & NAVIGATION
    const navLinks = document.querySelectorAll('.nav-spa');
    const pantallas = document.querySelectorAll('.pantalla-spa');
    const appShell = document.getElementById('app-shell');
    const pantallaLogin = document.getElementById('pantalla-login');
    const tituloSeccion = document.getElementById('titulo-seccion');
    const btnTema = document.getElementById('btn-tema');
    const root = document.documentElement;

    // Tema visual: respeta la preferencia del sistema y conserva la selección del usuario.
    const temaGuardado = localStorage.getItem('cmp-tema');
    const temaInicial = temaGuardado || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    function aplicarTema(tema) {
        const esOscuro = tema === 'dark';
        root.dataset.theme = esOscuro ? 'dark' : 'light';
        if (btnTema) {
            btnTema.setAttribute('aria-label', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
            btnTema.setAttribute('title', esOscuro ? 'Activar modo claro' : 'Activar modo oscuro');
            btnTema.innerHTML = `<i class='bx ${esOscuro ? 'bx-sun' : 'bx-moon'}' aria-hidden="true"></i>`;
        }
    }

    aplicarTema(temaInicial);

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            const nuevoTema = root.dataset.theme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('cmp-tema', nuevoTema);
            aplicarTema(nuevoTema);
        });
    }

    function navigateTo(pantallaId) {
        // Hide all screens
        pantallas.forEach(p => p.classList.remove('activa'));
        
        // Show target screen
        const target = document.getElementById(pantallaId);
        if(target) {
            target.classList.add('activa');
        }

        // Update nav active states
        navLinks.forEach(link => {
            const isActive = link.getAttribute('data-target') === pantallaId;
            link.classList.toggle('activo', isActive);
            if (isActive) {
                link.setAttribute('aria-current', 'page');
                // Update title based on nav text
                if (tituloSeccion) {
                    tituloSeccion.textContent = link.textContent.trim();
                }
            } else {
                link.removeAttribute('aria-current');
            }
        });

        // Cierra el menu movil si esta abierto
        const barraLateral = document.getElementById('barra-lateral');
        const overlayMenu = document.getElementById('overlay-menu');
        if(barraLateral) barraLateral.classList.remove('abierta');
        if(overlayMenu) overlayMenu.classList.remove('activo');
        
        // Cerrar menu usuario si estuviera abierto
        const menuUsuario = document.getElementById('menu-usuario');
        if(menuUsuario) menuUsuario.style.display = 'none';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if(targetId) navigateTo(targetId);
        });
    });

    // Navegación táctil entre módulos principales en teléfonos.
    const areaTrabajo = document.querySelector('.area-trabajo');
    const pantallasDeslizables = [
        'pantalla-dashboard',
        'pantalla-clientes',
        'pantalla-polizas',
        'pantalla-recordatorios',
        'pantalla-reportes'
    ];
    let inicioDeslizamiento = null;

    if (areaTrabajo) {
        areaTrabajo.addEventListener('touchstart', (event) => {
            const objetivo = event.target;
            if (objetivo.closest('input, textarea, select, button, a, [contenteditable="true"], .tabla-recientes, .campo-busqueda')) {
                inicioDeslizamiento = null;
                return;
            }

            const toque = event.changedTouches[0];
            inicioDeslizamiento = { x: toque.clientX, y: toque.clientY };
        }, { passive: true });

        areaTrabajo.addEventListener('touchend', (event) => {
            if (!inicioDeslizamiento || window.matchMedia('(min-width: 601px)').matches) {
                inicioDeslizamiento = null;
                return;
            }

            const toque = event.changedTouches[0];
            const deltaX = toque.clientX - inicioDeslizamiento.x;
            const deltaY = toque.clientY - inicioDeslizamiento.y;
            const desplazamientoHorizontal = Math.abs(deltaX);
            const desplazamientoVertical = Math.abs(deltaY);
            const pantallaActual = pantallasDeslizables.findIndex(id => document.getElementById(id)?.classList.contains('activa'));

            inicioDeslizamiento = null;

            if (pantallaActual < 0 || desplazamientoHorizontal < 56 || desplazamientoHorizontal < desplazamientoVertical * 1.25) {
                return;
            }

            const siguientePantalla = deltaX < 0 ? pantallaActual + 1 : pantallaActual - 1;
            if (siguientePantalla >= 0 && siguientePantalla < pantallasDeslizables.length) {
                navigateTo(pantallasDeslizables[siguientePantalla]);
            }
        }, { passive: true });
    }

    // 2. ACCESO A LA APLICACIÓN
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            pantallaLogin.classList.remove('activa');
            appShell.style.display = 'block';
            navigateTo('pantalla-dashboard');
        });
    }

    // 3. MENU DE USUARIO & LOGOUT
    const btnPerfil = document.querySelector('.btn-perfil');
    const avatarUsuario = document.querySelector('.avatar-usuario');
    const menuUsuario = document.getElementById('menu-usuario'); // Si existe
    const linkLogout = document.getElementById('link-logout');

    if (btnPerfil || avatarUsuario) {
        const trigger = btnPerfil || avatarUsuario;
        trigger.addEventListener('click', () => {
            // Un simple confirm para logout si no hay menu dropdown implementado
            if(confirm("¿Deseas cerrar sesión?")) {
                appShell.style.display = 'none';
                pantallaLogin.classList.add('activa');
            }
        });
    }

    if (linkLogout) {
        linkLogout.addEventListener('click', (e) => {
            e.preventDefault();
            if(confirm("¿Seguro que deseas salir?")) {
                appShell.style.display = 'none';
                pantallaLogin.classList.add('activa');
            }
        });
    }

    // 4. MENU MOVIL (RESPONSIVE)
    const btnMenuMovil = document.getElementById('btn-menu-movil');
    const barraLateral = document.getElementById('barra-lateral');
    const overlayMenu = document.getElementById('overlay-menu');

    if (btnMenuMovil && barraLateral && overlayMenu) {
        btnMenuMovil.addEventListener('click', () => {
            barraLateral.classList.add('abierta');
            overlayMenu.classList.add('activo');
        });

        overlayMenu.addEventListener('click', () => {
            barraLateral.classList.remove('abierta');
            overlayMenu.classList.remove('activo');
        });
    }

    // 5. MODALS Y LOGICA ESPECIFICA (Clientes, Polizas, Recordatorios)
    // Buscador General (Filtro simulado)
    const inputBuscar = document.querySelector('.campo-busqueda input');
    if(inputBuscar) {
        inputBuscar.addEventListener('keyup', (e) => {
            const query = e.target.value.toLowerCase();
            const filas = document.querySelectorAll('.fila-cliente, .policy-card, .reminder');
            filas.forEach(fila => {
                const text = fila.textContent.toLowerCase();
                fila.style.display = text.includes(query) ? '' : 'none';
            });
        });
    }

    // Notificaciones: Seleccion de canales
    const tarjetasCanal = document.querySelectorAll('.tarjeta-canal');
    tarjetasCanal.forEach(tarjeta => {
        tarjeta.addEventListener('click', () => {
            tarjeta.classList.toggle('activo');
            const toggle = tarjeta.querySelector('.toggle-switch');
            if(toggle) toggle.checked = !toggle.checked;
        });
    });

    // Pestañas (Notificaciones / Reportes)
    const tabsCategorias = document.querySelectorAll('.tab-categoria');
    tabsCategorias.forEach(tab => {
        tab.addEventListener('click', () => {
            tabsCategorias.forEach(t => t.classList.remove('activo'));
            tab.classList.add('activo');
        });
    });

    // 6. Lógica del Modal Editar Cliente
    const modalEditar = document.getElementById('modal-editar-cliente');
    const btnCerrarEditar = document.getElementById('btn-cerrar-editar');
    const btnCancelarEditar = document.getElementById('btn-cancelar-editar');
    const formEditar = document.getElementById('form-editar-cliente');

    if(modalEditar) {
        document.querySelectorAll('.btn-editar-cliente').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                // Extract data from attributes
                const nombre = btn.getAttribute('data-cliente');
                const correo = btn.getAttribute('data-correo');
                const seguro = btn.getAttribute('data-seguro');

                // Fill form
                document.getElementById('edit-nombre').value = nombre || '';
                document.getElementById('edit-correo').value = correo || '';
                document.getElementById('edit-seguro').value = seguro || '';

                // Show modal
                modalEditar.style.display = 'flex';
            });
        });

        const closeModal = () => { modalEditar.style.display = 'none'; };
        
        if (btnCerrarEditar) btnCerrarEditar.addEventListener('click', closeModal);
        if (btnCancelarEditar) btnCancelarEditar.addEventListener('click', closeModal);
        
        if (formEditar) {
            formEditar.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Cliente actualizado con éxito (Simulado)');
                closeModal();
            });
        }
    }

});