/* CLIENTMANAGER PRO PANTALLA DE PÓLIZAS*/
document.addEventListener("DOMContentLoaded", () => {
    /*  DATOS DE EJEMPLO*/
    let policies = [
        {
            id: 1,
            client: "Ana María García López",
            policy: "POL-00123456",
            type: "auto",
            typeName: "Automóvil",
            start: "01 Ene 2024",
            end: "01 Ene 2027",
            status: "vigente"
        },

        {
            id: 2,
            client: "Carlos Alberto Rodríguez Soto",
            policy: "POL-00234567",
            type: "vida",
            typeName: "Vida",
            start: "15 Feb 2024",
            end: "15 Feb 2027",
            status: "por-vencer"
        },

        {
            id: 3,
            client: "María Elvira Pérez Castaño",
            policy: "POL-00345678",
            type: "salud",
            typeName: "Salud",
            start: "10 Dic 2023",
            end: "10 Dic 2026",
            status: "vencida"
        },

        {
            id: 4,
            client: "Juan Camilo Sánchez Ortiz",
            policy: "POL-00456789",
            type: "hogar",
            typeName: "Hogar",
            start: "05 Mar 2025",
            end: "05 Mar 2028",
            status: "vigente"
        },
        {
            id: 5,
            client: "Sofía Valentina Vargas Martínez",
            policy: "POL-00567890",
            type: "auto",
            typeName: "Automóvil",
            start: "20 May 2025",
            end: "20 May 2028",
            status: "vigente"
        },
        {
            id: 6,
            client: "Luis Fernando Herrera Vargas",
            policy: "POL-00678901",
            type: "vida",
            typeName: "Vida",
            start: "01 Jul 2024",
            end: "01 Jul 2026",
            status: "vencida"
        }
    ];
    /* ESTADO DE LA INTERFAZ */
    let currentFilter = "all";
    let currentType = "all";
    let currentSearch = "";
    /* ELEMENTOS HTML */
    const policiesList =
        document.getElementById("policiesList");
    const searchInput =
        document.getElementById("searchInput");
    const typeFilter =
        document.getElementById("typeFilter");
    const filterButtons =
        document.querySelectorAll(".filter-button");
    const resultsCounter =
        document.getElementById("resultsCounter");
    const emptyState =
        document.getElementById("emptyState");
    /*  MODAL */

    const modalOverlay =
        document.getElementById("modalOverlay");
    const newPolicyButton =
        document.getElementById("newPolicyButton");
    const floatingNewPolicy =
        document.getElementById("floatingNewPolicy");
    const closeModal =
        document.getElementById("closeModal");
    const cancelModal =
        document.getElementById("cancelModal");
    const policyForm =
        document.getElementById("policyForm");
    /* MENU */
    const sidebar =
        document.getElementById("sidebar");
    const sidebarOverlay =
        document.getElementById("sidebarOverlay");
    const openSidebar =
        document.getElementById("openSidebar");
    const closeSidebar =
        document.getElementById("closeSidebar");
    /* TOAST*/
    const toast =
        document.getElementById("toast");
    /* OBTENER INICIALES */
    function getInitials(name) {

        const parts =
            name
                .split(" ")
                .filter(Boolean)
                .slice(0, 2);
        return parts
            .map(
                part =>
                    part.charAt(0)
                        .toUpperCase()
            )
            .join("");
    }

    /* TEXTO DE ESTADO*/

    function getStatusText(status) {

        const statusNames = {

            "vigente": "Vigente",

            "por-vencer": "Por vencer",

            "vencida": "Vencida"
        };
        return statusNames[status] || status;
    }

    /*  MOSTRAR PÓLIZAS */

    function renderPolicies() {

        const filteredPolicies =
            policies.filter(policy => {

                /* BUSQUEDA */

                const searchContent = (

                    policy.client +
                    " " +
                    policy.policy +
                    " " +
                    policy.typeName

                ).toLowerCase();

                const matchesSearch =
                    searchContent.includes(
                        currentSearch
                            .toLowerCase()
                            .trim()
                    );
                /* ESTADO */

                const matchesStatus =

                    currentFilter === "all" ||

                    policy.status ===
                        currentFilter;
                /* TIPO */
                const matchesType =
                    currentType === "all" ||
                    policy.type ===
                        currentType;
                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesType
                );
            });

        policiesList.innerHTML = "";
        /*SIN RESULTADOS*/
        if (
            filteredPolicies.length === 0
        ) {
            emptyState.classList.remove(
                "hidden"
            );
        }
        else {
            emptyState.classList.add(
                "hidden"
            );
        }
        /* CREAR TARJETAS */
        filteredPolicies.forEach(
            (policy, index) => {
                const card =
                    document.createElement(
                        "article"
                    );
                card.className =
                    "policy-card";
                card.style.animationDelay =
                    `${index * 50}ms`;
                card.innerHTML = `
                    <div class="policy-client">
                        <div class="client-avatar">
                            ${getInitials(
                                policy.client
                            )}
                        </div>
                        <div>
                            <div class="client-name">
                                ${policy.client}
                            </div>
                            <span class="client-sub">
                                ${policy.typeName}
                            </span>
                        </div>
                    </div>
                    <div class="policy-information">
                        <div>
                            Póliza:
                            <b>
                                ${policy.policy}
                            </b>
                        </div>
                        <div>
                            Vigencia:
                            <b>
                                ${policy.start}
                                —
                                ${policy.end}
                            </b>
                        </div>
                        <div class="policy-type">
                            Seguro
                            ${policy.typeName}
                        </div>
                        <div class="policy-type">
                            ${
                                policy.status ===
                                "vencida"

                                ? "Requiere revisión"

                                :

                                policy.status ===
                                "por-vencer"

                                ? "Programar seguimiento"

                                :
                                "Cobertura activa"
                            }
                        </div>
                    </div>
                    <span
                        class="
                            policy-status
                            ${policy.status}
                        "
                    >
                        ${getStatusText(
                            policy.status
                        )}

                    </span>
                `;

                /* DETALLE*/

                card.addEventListener(
                    "click",
                    () => {

                        showPolicyInformation(
                            policy
                        );

                    }
                );


                policiesList.appendChild(
                    card
                );

            }
        );
        /* CONTADOR */

        resultsCounter.textContent =

            `${filteredPolicies.length}
            ${
                filteredPolicies.length === 1
                ? "póliza"
                : "pólizas"
            }`;
        updateSummary();
    }
    /* ACTUALIZAR RESUMEN */

    function updateSummary() {
        const total =
            policies.length;
        const active =
            policies.filter(
                policy =>
                    policy.status ===
                    "vigente"
            ).length;
        const expiring =
            policies.filter(
                policy =>
                    policy.status ===
                    "por-vencer"
            ).length;
        const expired =
            policies.filter(
                policy =>
                    policy.status ===
                    "vencida"
            ).length;

        document.getElementById(
            "totalPolicies"
        ).textContent = total;

        document.getElementById(
            "activePolicies"
        ).textContent = active;

        document.getElementById(
            "expiringPolicies"
        ).textContent = expiring;

        document.getElementById(
            "expiredPolicies"
        ).textContent = expired;
    }

    /*FILTROS DE ESTADO */
    filterButtons.forEach(
        button => {
            button.addEventListener(
                "click",
                () => {
                    currentFilter =
                        button.dataset.filter;
                    filterButtons.forEach(
                        item => {

                            item.classList.remove(
                                "active"
                            );
                        }
                    );
                    button.classList.add(
                        "active"
                    );
                    renderPolicies();
                }
            );
        }
    );
    /*  BUSCADOR */

    searchInput.addEventListener(
        "input",
        event => {
            currentSearch =
                event.target.value;
            renderPolicies();
        }
    );
    /* FILTRO POR TIPO*/
    typeFilter.addEventListener(
        "change",
        event => {
            currentType =
                event.target.value;
            renderPolicies();
        }
    );

    /* CTRL + k*/

    document.addEventListener(
        "keydown",
        event => {


            if (
                (event.ctrlKey ||
                event.metaKey) &&

                event.key.toLowerCase() ===
                "k"
            ) {
                event.preventDefault();
                searchInput.focus();
            }
            if (
                event.key ===
                "Escape"
            ) {
                closeModalWindow();
                closeSidebarMenu();
            }
        }
    );

    /* MODAL*/

    function openModalWindow() {

        modalOverlay.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

        document.getElementById(
            "client"
        ).focus();
    }
    function closeModalWindow() {
        modalOverlay.classList.remove(
            "show"
        );
        document.body.style.overflow =
            "";
        policyForm.reset();
    }

    newPolicyButton.addEventListener(
        "click",
        openModalWindow
    );

    floatingNewPolicy.addEventListener(
        "click",
        openModalWindow
    );

    closeModal.addEventListener(
        "click",
        closeModalWindow
    );

    cancelModal.addEventListener(
        "click",
        closeModalWindow
    );

    modalOverlay.addEventListener(
        "click",
        event => {
            if (
                event.target ===
                modalOverlay
            ) {
                closeModalWindow();
            }
        }
    );
    /*GUARDAR PÓLIZA*/

    policyForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const client =
                document.getElementById(
                    "client"
                ).value;

            const type =
                document.getElementById(
                    "insuranceType"
                ).value;

            const typeName =
                document.getElementById(
                    "insuranceType"
                )
                .selectedOptions[0]
                .textContent;

            const policyNumber =
                document.getElementById(
                    "policyNumber"
                ).value.trim();

            const startDate =
                formatDate(
                    document.getElementById(
                        "startDate"
                    ).value
                );

            const endDate =
                formatDate(
                    document.getElementById(
                        "endDate"
                    ).value
                );

            const status =
                document.getElementById(
                    "policyStatus"
                ).value;

            if (
                !client ||
                !type ||
                !policyNumber ||
                !startDate ||
                !endDate
            ) {
                return;
            }

            const newPolicy = {
                id:
                    Date.now(),
                client:
                    client,
                policy:
                    policyNumber,
                type:
                    type,
                typeName:
                    typeName,
                start:
                    startDate,
                end:
                    endDate,
                status:
                    status
            };
            policies.unshift(
                newPolicy
            );
            closeModalWindow();
            renderPolicies();
            showToast();
        }
    );
    /* FORMATEAR FECHA */

    function formatDate(
        value
    ) {

        if (!value) {
            return "";
        }


        const parts =
            value.split("-");


        const year =
            parts[0];

        const month =
            Number(parts[1]);

        const day =
            parts[2];


        const months = [

            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic"

        ];


        return (

            `${day}
            ${months[month - 1]}
            ${year}`

        );

    }
    /*  MOSTRAR DETALLE*/

    function showPolicyInformation(
        policy
    ) {

        alert(

            `PÓLIZA

Cliente:
${policy.client}

Número:
${policy.policy}

Tipo:
${policy.typeName}

Vigencia:
${policy.start} — ${policy.end}

Estado:
${getStatusText(
    policy.status
)}`
        );
    }
    /*  TOAST*/

    function showToast() {
        toast.classList.add(
            "show"
        );
        setTimeout(
            () => {
                toast.classList.remove(
                    "show"
                );
            },
            3200
        );
    }

    /* MENU MOVIL */

    function openSidebarMenu() {

        sidebar.classList.add(
            "open"
        );

        sidebarOverlay.classList.add(
            "show"
        );

        document.body.style.overflow =
            "hidden";

    }
    function closeSidebarMenu() {

        sidebar.classList.remove(
            "open"
        );

        sidebarOverlay.classList.remove(
            "show"
        );

        document.body.style.overflow =
            "";
    }
    openSidebar.addEventListener(
        "click",
        openSidebarMenu
    );
    closeSidebar.addEventListener(
        "click",
        closeSidebarMenu
    );

    sidebarOverlay.addEventListener(
        "click",
        closeSidebarMenu
    );
    /* NOTIFICACIONES*/

    document.getElementById(
        "notificationButton"
    ).addEventListener(
        "click",
        () => {
            showToast();
        }
    );


    /* LIMPIAR FILTROS */
    document.getElementById(
        "clearFilters"
    ).addEventListener(
        "click",
        () => {

            currentFilter =
                "all";

            currentType =
                "all";

            currentSearch =
                "";

            searchInput.value =
                "";

            typeFilter.value =
                "all";

            filterButtons.forEach(
                button => {
                    button.classList.remove(
                        "active"
                    );
                }
            );

            document.querySelector(
                '[data-filter="all"]'
            ).classList.add(
                "active"
            );
            renderPolicies();
        }
    );

    /*INICIALIZAR*/
    renderPolicies();

});