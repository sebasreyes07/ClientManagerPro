document.addEventListener("DOMContentLoaded", () => {

    let reminders = [
        {
            client: "Ana García Pérez",
            type: "cumpleaños",
            description: "Cumpleaños Ana (52 años)",
            day: "21",
            month: "ENE",
            status: "sent"
        },
        {
            client: "Juan López Rodríguez",
            type: "pagos",
            description: "Pago Póliza Autos (Cuota 3)",
            day: "05",
            month: "FEB",
            status: "pending"
        },
        {
            client: "María Fernández Sánchez",
            type: "vencimientos",
            description: "Vencimiento Póliza Vida Global POL-456",
            day: "12",
            month: "MAR",
            status: "pending"
        },
        {
            client: "Carlos Ramírez Soto",
            type: "renovaciones",
            description: "Renovación Póliza Hogar Plus",
            day: "28",
            month: "ABR",
            status: "sent"
        }
    ];

    let currentFilter = "todos";

    const timeline = document.getElementById("timeline");
    const emptyState = document.getElementById("emptyState");
    const counter = document.getElementById("counter");

    const filters = document.querySelectorAll(".filter");

    function render() {

        const visible = reminders.filter(item =>
            currentFilter === "todos" ||
            item.type === currentFilter
        );

        timeline.innerHTML = "";

        emptyState.classList.toggle(
            "show",
            visible.length === 0
        );

        visible.forEach((item, index) => {

            const card = document.createElement("article");

            card.className =
                `reminder ${
                    item.status === "sent"
                    ? "green"
                    : index === 1
                    ? "yellow"
                    : "red"
                }`;

            card.innerHTML = `
                <div>
                    <div class="reminder-name">
                        ${item.client}
                    </div>

                    <div class="reminder-description">
                        ${item.description}
                    </div>

                    <span class="status ${item.status}">
                        ${
                            item.status === "sent"
                            ? "Enviado"
                            : "Pendiente"
                        }
                    </span>
                </div>

                <div class="reminder-date">
                    <strong>${item.day}</strong>
                    <span>${item.month}</span>
                </div>
            `;

            timeline.appendChild(card);
        });

        counter.textContent =
            `${visible.length} ${
                visible.length === 1
                ? "recordatorio"
                : "recordatorios"
            }`;

        updateSummary();
    }


    function updateSummary() {

        document.getElementById("todayCount").textContent =
            reminders.length;

        document.getElementById("sentCount").textContent =
            reminders.filter(
                item => item.status === "sent"
            ).length;

        document.getElementById("pendingCount").textContent =
            reminders.filter(
                item => item.status === "pending"
            ).length;
    }


    /* FILTROS */

    filters.forEach(button => {

        button.addEventListener("click", () => {

            filters.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentFilter =
                button.dataset.filter;

            render();
        });
    });


    /* MODAL */

    const modal =
        document.getElementById("modal");

    function openModal() {
        modal.classList.add("show");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        modal.classList.remove("show");
        document.body.style.overflow = "";
        document.getElementById("reminderForm").reset();
    }

    document.getElementById("newReminder")
        .addEventListener("click", openModal);

    document.getElementById("fab")
        .addEventListener("click", openModal);

    document.getElementById("closeModal")
        .addEventListener("click", closeModal);

    document.getElementById("cancelModal")
        .addEventListener("click", closeModal);

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            closeModal();
        }
    });


    /* CREAR RECORDATORIO */

    document.getElementById("reminderForm")
        .addEventListener("submit", e => {

            e.preventDefault();

            const client =
                document.getElementById("client").value.trim();

            const type =
                document.getElementById("type").value;

            const date =
                document.getElementById("date").value;

            const description =
                document.getElementById("description").value.trim();

            if (!client || !date || !description) {
                return;
            }

            const parts = date.split("-");

            const months = [
                "ENE","FEB","MAR","ABR",
                "MAY","JUN","JUL","AGO",
                "SEP","OCT","NOV","DIC"
            ];

            reminders.push({
                client,
                type,
                description,
                day: parts[2],
                month: months[
                    Number(parts[1]) - 1
                ],
                status: "pending"
            });

            closeModal();
            render();
            showToast();
        });


    /* TOAST */

    function showToast() {

        const toast =
            document.getElementById("toast");

        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }


    /* MENÚ MÓVIL */

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");

    document.getElementById("openMenu")
        .addEventListener("click", () => {
            sidebar.classList.add("open");
            overlay.classList.add("show");
        });
    document.getElementById("closeMenu")
        .addEventListener("click", closeMenu);

    overlay.addEventListener("click", closeMenu);
    function closeMenu() {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    }
    /* INICIO */

    render();

});