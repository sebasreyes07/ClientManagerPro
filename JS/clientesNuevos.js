/* CLIENTMANAGER PRO NUEVO CLIENTE*/

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("clientForm");
    const cancelButton = document.getElementById("cancelButton");

    const toast = document.getElementById("toast");

    const sidebar = document.getElementById("sidebar");
    const openSidebarButton = document.getElementById("openSidebar");
    const closeSidebarButton = document.getElementById("closeSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const fields = [
        "nombres",
        "apellidos",
        "cedula",
        "fechaNacimiento",
        "telefono",
        "correo",
        "direccion",
        "ciudad"
    ];

    /* MENU MÓVIL */
    function openSidebar() {

        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");
        document.body.style.overflow = "hidden";
    }


    function closeSidebar() {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");

        document.body.style.overflow = "";
    }


    openSidebarButton.addEventListener("click", openSidebar);

    closeSidebarButton.addEventListener("click", closeSidebar);

    sidebarOverlay.addEventListener("click", closeSidebar);

    /* VALIDACIONES */

    function getField(id) {
        return document.getElementById(id);
    }

    function showError(field, message) {
        const container = field.closest(".field");
        container.classList.add("has-error");
        const error = container.querySelector(".error-message");
        error.textContent = message;
    }


    function clearError(field) {

        const container = field.closest(".field");
        container.classList.remove("has-error");
        const error = container.querySelector(".error-message");
        error.textContent = "";
    }


    function validateRequired(field, message) {

        if (!field.value.trim()) {
            showError(field, message);
            return false;
        }
        clearError(field);
        return true;
    }


    function validateEmail(field) {
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(field.value.trim())) {
            showError(
                field,
                "Ingrese un correo electrónico válido."
            );
            return false;
        }
        clearError(field);
        return true;
    }


    function validateCedula(field) {
        const value = field.value.trim();
        if (!/^\d{6,10}$/.test(value)) {
            showError(
                field,
                "La cédula debe contener entre 6 y 10 números."
            );
            return false;
        }
        clearError(field);
        return true;
    }

    function validatePhone(field) {

        const cleanPhone =
            field.value.replace(/\D/g, "");
        if (cleanPhone.length < 7) {
            showError(
                field,
                "Ingrese un número de teléfono válido."
            );
            return false;
        }
        clearError(field);
        return true;
    }


    function validateBirthDate(field) {

        if (!field.value) {
            showError(
                field,
                "Seleccione la fecha de nacimiento."
            );
            return false;
        }
        const date =
            new Date(field.value);
        const today =
            new Date();
        if (date > today) {
            showError(
                field,
                "La fecha no puede ser futura."
            );
            return false;
        }
        clearError(field);
        return true;
    }
    /* VALIDACIÓN EN TIEMPO REAL */

    fields.forEach(id => {

        const field = getField(id);

        field.addEventListener("input", () => {

            if (field.value.trim()) {
                clearError(field);
            }

        });

    });

    /*  FORMATEAR CÉDULA*/

    getField("cedula").addEventListener("input", event => {

        event.target.value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

    });

    /*  FORMATEAR TELÉFONO */

    getField("telefono").addEventListener("input", event => {

        let value =
            event.target.value
                .replace(/\D/g, "")
                .slice(0, 10);

        if (value.length > 3) {

            value =
                value.replace(
                    /(\d{3})(\d+)/,
                    "$1 $2"
                );
        }

        if (value.length > 7) {

            value =
                value.replace(
                    /(\d{3}) (\d{3})(\d+)/,
                    "$1 $2 $3"
                );
        }

        event.target.value = value;

    });

    /* GUARDAR CLIENTE*/

    form.addEventListener("submit", event => {

        event.preventDefault();


        const nombres =
            getField("nombres");

        const apellidos =
            getField("apellidos");

        const cedula =
            getField("cedula");

        const fechaNacimiento =
            getField("fechaNacimiento");

        const telefono =
            getField("telefono");

        const correo =
            getField("correo");

        const direccion =
            getField("direccion");

        const ciudad =
            getField("ciudad");

        let isValid = true;
        if (!validateRequired(
            nombres,
            "Ingrese los nombres del cliente."
        )) {
            isValid = false;
        }

        if (!validateRequired(
            apellidos,
            "Ingrese los apellidos del cliente."
        )) {
            isValid = false;
        }

        if (!validateCedula(cedula)) {
            isValid = false;
        }

        if (!validateBirthDate(fechaNacimiento)) {
            isValid = false;
        }

        if (!validatePhone(telefono)) {
            isValid = false;
        }

        if (!validateEmail(correo)) {
            isValid = false;
        }

        if (!validateRequired(
            direccion,
            "Ingrese la dirección."
        )) {
            isValid = false;
        }
        if (!validateRequired(
            ciudad,
            "Ingrese la ciudad."
        )) {
            isValid = false;
        }
        if (!isValid) {

            const firstError =
                form.querySelector(
                    ".field.has-error input"
                );

            if (firstError) {
                firstError.focus();
            }
            return;
        }
        /* CREAR OBJETO CLIENTE */

        const cliente = {

            id:
                crypto.randomUUID
                    ? crypto.randomUUID()
                    : Date.now().toString(),
            nombres:
                nombres.value.trim(),
            apellidos:
                apellidos.value.trim(),
            cedula:
                cedula.value.trim(),
            fechaNacimiento:
                fechaNacimiento.value,
            telefono:
                telefono.value.trim(),
            correo:
                correo.value.trim(),
            direccion:
                direccion.value.trim(),
            ciudad:
                ciudad.value.trim(),

            fechaRegistro:
                new Date().toISOString()

        };
        /* GUARDAR EN LOCALSTORAGE*/

        const clientesGuardados =
            JSON.parse(
                localStorage.getItem("clientes")
            ) || [];

        clientesGuardados.push(cliente);

        localStorage.setItem(
            "clientes",
            JSON.stringify(clientesGuardados)
        );

        /* MENSAJE*/
        showToast();

        /* LIMPIAR FORMULARIO*/
        form.reset();
        fields.forEach(id => {
            clearError(
                getField(id)
            );
        });
    });

    /* CANCELAR*/
    cancelButton.addEventListener("click", () => {

        const confirmed =
            confirm(
                "¿Desea cancelar el registro? Se perderán los datos ingresados."
            );


        if (confirmed) {

            form.reset();

            fields.forEach(id => {

                clearError(
                    getField(id)
                );

            });

        }

    });

    /*TOAST*/
    function showToast() {
        toast.classList.add("show");
        setTimeout(() => {
            toast.classList.remove("show");

        }, 3500);

    }
    /* ANIMACIÓN DE ENTRADA */

    const elements = [
        ".breadcrumb",
        ".page-heading",
        ".form-card"
    ];


    elements.forEach(
        (selector, index) => {
            const element =
                document.querySelector(selector);
            if (!element) return;
            element.animate(
                [
                    {
                        opacity: 0,
                        transform:
                            "translateY(14px)"
                    },
                    {
                        opacity: 1,
                        transform:
                            "translateY(0)"
                    }
                ],
                {
                    duration:
                        450 + (index * 120),
                    easing:
                        "cubic-bezier(.2,.8,.2,1)",
                    fill:
                        "forwards"
                }
            );
        }
    );

});