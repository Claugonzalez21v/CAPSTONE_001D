/* ===== VARIABLES ===== */
const stripe = Stripe("pk_test_51TdM7iPLsltGKLrGGuBxWZebNhIFhAK0OVc6X6rnPcbDxljrXq4Bf4OtAv0DkqdCf4Blsy5ufK1ujObJ80Cclphs00cXLH6paF");

let user = "Usuario";

let servicio = "";
let selectedDate = "";
let selectedHour = "";
let precios = 0;

let notificaciones =

    JSON.parse(
        localStorage.getItem(
            "notificaciones"
        )

    ) || [];

/* ===== INICIO ===== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        

        let nombre =

            document.getElementById(
                "user-name"
            );

        if (
            nombre
        ) {

            nombre.innerText =
                "Usuario";

        }

        actualizarContador();

        inicializarCalendarios();

    });


/* ===== NOTIFICACIONES ===== */

const notifBtn =
    document.getElementById(
        "notif"
    );

const notifPanel =
    document.getElementById(
        "notif-panel"
    );

const notifCount =
    document.getElementById(
        "notif-count"
    );


function actualizarContador() {

    if (notifCount) {

        notifCount.innerText =
            notificaciones.length;

    }

}


function agregarNotif(texto) {

    notificaciones.unshift({

        texto,
        id: Date.now()

    });

    localStorage.setItem(

        "notificaciones",

        JSON.stringify(
            notificaciones)

    );

    actualizarContador();

}


if (notifBtn) {

    notifBtn.onclick = (e) => {

        e.stopPropagation();

        notifPanel.innerHTML = "";

        if (notificaciones.length === 0) {

            notifPanel.innerHTML =

                "<div class='notif-item'>Sin notificaciones</div>";

        } else {

            notificaciones.forEach(n => {

                notifPanel.innerHTML += `

<div class="notif-item">

<span>
🔔 ${n.texto}
</span>

<button
onclick="eliminarNotif(${n.id})">

✖

</button>

</div>

`;

            });

        }

        notifPanel.classList.toggle(
            "show"
        );

    };

}


function eliminarNotif(id) {

    notificaciones =
        notificaciones.filter(
            x => x.id !== id
        );

    actualizarContador();

    localStorage.setItem(
        "notificaciones",
        JSON.stringify(notificaciones)
    );

    notifBtn.click();

    notifBtn.click();

}



/* ===== MENU ===== */

function cambiarVista(v, event) {

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(x => {

            x.classList.remove(
                "active"
            );

        });


    if (event) {

        event.currentTarget
            .classList.add(
                "active"
            );

    }


    document
        .querySelectorAll(
            ".vista"
        )
        .forEach(x => {

            x.classList.add(
                "hidden"
            );

        });


    let destino =
        document.getElementById(
            v
        );

    if (destino) {

        destino.classList.remove(
            "hidden"
        );

    }


    if (v === "reservas") {

        irPaso(1);

    }


    if (
        v === "agenda" &&
        typeof cerrarPopup === "function"
    ) {

        cerrarPopup();

    }

}



/* ===== SERVICIO ===== */

function seleccionarServicio(tipo) {

    servicio = tipo;

    const listaPrecios = {

        "Caballero": 10000,
        "Dama": 15000,
        "Barba": 6000,
        "Completo": 20000

    };

    precios = listaPrecios[tipo];
    console.log("Servicio:", tipo);
    console.log("Precio:", precios);

    actualizarResumen();

    document
        .querySelectorAll(
            ".servicio-box"
        )
        .forEach(x => {

            x.classList.remove(
                "active"
            );

        });

    event.currentTarget
        .classList.add(
            "active"
        );

    actualizarResumen();

}


/* ===== HORA ===== */

function selectHour(h) {

    selectedHour = h;

    document
        .querySelectorAll(
            ".hours button"
        )
        .forEach(x => {

            x.classList.remove(
                "active"
            );

        });

    event.currentTarget
        .classList.add(
            "active"
        );

    actualizarResumen();

}

function actualizarHoras() {

    let botones =
        document.querySelectorAll(
            ".hours button"
        );

    let ahora =
        new Date();

    let hoy =
        ahora.toLocaleDateString(
            "sv-SE"
        );

    botones.forEach(btn => {

        btn.disabled = false;

        btn.style.background = "";
        btn.style.opacity = "1";

        let horaTexto =
            btn.innerText;

        let hora24 =
            convertirHora(
                horaTexto
            );

        if (
            selectedDate === hoy
        ) {

            let horaActual =
                ahora.getHours();

            if (
                hora24 <= horaActual
            ) {

                btn.disabled = true;

                btn.style.background =
                    "#ff4444";

                btn.style.opacity =
                    "0.6";

            }

        }

    });

}

function convertirHora(hora) {

    if (
        hora.includes("9:")
    )
        return 9;

    if (
        hora.includes("10:")
    )
        return 10;

    if (
        hora.includes("11:")
    )
        return 11;

    if (
        hora.includes("2:")
    )
        return 14;
    if (

        hora.includes("3:")
    )
        return 15;
    

    return 0;

}



/* ===== RESUMEN ===== */

function actualizarResumen() {

    document
        .getElementById(
            "res-servicio"
        )
        .innerText =

        "Servicio: " +
        (
            servicio || "-"
        );


    document
        .getElementById(
            "res-fecha"
        )
        .innerText =

        "Fecha: " +
        (
            selectedDate || "-"
        );


    document
        .getElementById(
            "res-hora"
        )
        .innerText =

        "Hora: " +
        (
            selectedHour || "-"
        );

}



/* ===== PASOS ===== */

function irPaso(p) {

    if (
        p === 2 &&
        !servicio
    ) {

        mostrarAlerta(
            "Selecciona un servicio"
        );

        return;

    }

    if (
        p === 3 &&
        (
            !selectedDate ||
            !selectedHour
        )
    ) {

        mostrarAlerta(
            "Selecciona fecha y hora"
        );

        return;

    }


    /* NUEVO */

    let tituloPaso = "";

    if (p === 1) {

        tituloPaso =
            "Paso 1: Seleccionar Servicio";

    }

    if (p === 2) {

        tituloPaso =
            "Paso 2: Elegir Fecha y Hora";

    }

    if (p === 3) {

        tituloPaso =
            "Paso 3: Confirmar Reserva";

    }

    if (p === 4) {

        tituloPaso =
            "Paso 4: Reserva Confirmada";

    }

    document
        .querySelector(
            "#reservas h2"
        )
        .innerText =
        tituloPaso;


    /* LO DEMÁS SE QUEDA */

    document
        .querySelectorAll(
            "#paso1,#paso2,#paso3,#paso4"
        )
        .forEach(x => {

            x.classList.add(
                "hidden"
            );

        });


    document
        .getElementById(
            "paso" + p
        )
        .classList.remove(
            "hidden"
        );

}


/* ===== CALENDARIOS ===== */

function inicializarCalendarios() {

    let reserva =
        document.getElementById(
            "calendarInput"
        );

    if (reserva) {

        flatpickr(
            reserva,
            {
                inline: true,
                defaultDate: "today",
                dateFormat: "Y-m-d",
                minDate: "today",

                onReady(selectedDates) {

                    if (selectedDates.length) {

                        selectedDate =

                            selectedDates[0]
                                .toLocaleDateString(
                                    "sv-SE"
                                );

                    }

                    actualizarResumen();
                    actualizarHoras();

                },

                onChange(selectedDates) {

                    if (selectedDates.length) {

                        selectedDate =

                            selectedDates[0]
                                .toLocaleDateString(
                                    "sv-SE"
                                );

                    }

                    actualizarResumen();
                    actualizarHoras();

                }

            }

        );

    }


    let agenda =
        document.getElementById(
            "agendaCalendar"
        );

    if (agenda) {

        if (
            agenda._flatpickr
        ) {

            agenda._flatpickr.destroy();

        }

        fetch("/calendario/")
            .then(r => r.json())
            .then(data => {

                const reservas =
                    data.reservas;

                flatpickr(
                    agenda,
                    {

                        inline: true,

                        dateFormat: "Y-m-d",

                        onDayCreate(
                            dObj,
                            dStr,
                            fp,
                            dayElem
                        ) {

                            let fecha =

                                dayElem.dateObj
                                    .toLocaleDateString(
                                        "sv-SE"
                                    );

                            let reserva =

                                reservas.find(
                                    r => r.fecha === fecha
                                );

                            if (!reserva)
                                return;


                            if (
                                !reserva.cumplida
                            ) {

                                dayElem.style.background =
                                    "#ff4444";

                            }

                            else {

                                dayElem.style.background =
                                    "#2ecc71";

                            }

                            dayElem.style.color =
                                "white";

                            dayElem.style.borderRadius =
                                "50%";

                            dayElem.style.cursor =
                                "pointer";

                            dayElem.onclick = () => {

                                abrirReserva(
                                    reserva
                                );

                            };

                        }

                    }

                );

            });

    }


    flatpickr(
        agenda,
        {

            inline: true,

            dateFormat: "Y-m-d",

            onDayCreate(
                dObj,
                dStr,
                fp,
                dayElem
            ) {

                let fecha =

                    dayElem.dateObj
                        .toLocaleDateString(
                            "sv-SE"
                        );

                let reserva =

                    reservas.find(
                        r => r.fecha === fecha
                    );

                if (!reserva)
                    return;


                /* rojo pendiente */

                if (
                    !reserva.cumplida
                ) {

                    dayElem.style.background =
                        "#ff4444";

                }

                /* verde completada */

                else {

                    dayElem.style.background =
                        "#2ecc71";

                }

                dayElem.style.color =
                    "white";

                dayElem.style.borderRadius =
                    "50%";

                dayElem.style.cursor =
                    "pointer";

                dayElem.onclick = () => {

                    abrirReserva(
                        reserva
                    );

                };

            }

        }

    );

}


/* ===== POPUP RESERVA ===== */

let reservaSeleccionada = null;


function abrirReserva(data) {

    if (!data)
        return;

    reservaSeleccionada = data;


    document
        .getElementById(
            "popupServicio"
        )
        .innerText =
        "Servicio: " +
        (data.servicio || "-");


    document
        .getElementById(
            "popupFecha"
        )
        .innerText =
        "Fecha: " +
        (data.fecha || "-");


    document
        .getElementById(
            "popupHora"
        )
        .innerText =
        "Hora: " +
        (data.hora || "-");


    document
        .getElementById(
            "popupPrecio"
        )
        .innerText =
        "Precio: $" +
        Number(data.precio).toLocaleString("es-CL");

    document
        .getElementById(
            "popupFondo"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "infoReserva"
        )
        .classList.remove(
            "hidden"
        );

}

function cerrarPopup() {

    document
        .getElementById(
            "infoReserva"
        )
        .classList.add(
            "hidden"
        );

    document
        .getElementById(
            "popupFondo"
        )
        .classList.add(
            "hidden"
        );

}



async function confirmarEliminar() {

    if (!reservaSeleccionada)
        return;

    try {

        const response =
            await fetch(

                `/eliminar/${reservaSeleccionada.id}/`,
                {

                    method: "DELETE",

                    headers: {

                        "X-CSRFToken":
                            getCookie(
                                "csrftoken"
                            )

                    }

                }

            );

        const data =
            await response.json();

        if (data.ok) {

            cerrarPopup();

            inicializarCalendarios();

            mostrarAlerta(
                "Reserva eliminada"
            );

        }

    }

    catch (error) {

        console.log(
            error
        );

    }

}
/* ===== PAGO ===== */

function abrirPago() {

    document
        .getElementById(
            "pagoModal"
        )
        .classList.add(
            "active"
        );

    document.getElementById("pagoTotal").innerText =
"$" + precios.toLocaleString("es-CL");


    /* restaurar formulario */

    document
        .getElementById(
            "tarjeta"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "fechaPago"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "cvv"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "btnPagar"
        )
        .style.display =
        "block";

    document
        .querySelector(
            ".cancel"
        )
        .style.display =
        "block";

    document
        .getElementById(
            "btnPagar"
        )
        .disabled = false;


    /* limpiar campos */

    document
        .getElementById(
            "tarjeta"
        )
        .value = "";

    document
        .getElementById(
            "fechaPago"
        )
        .value = "";

    document
        .getElementById(
            "cvv"
        )
        .value = "";


    /* limpiar contenido viejo */

    document
        .getElementById(
            "animacionPago"
        )
        .innerHTML = "";

}


/* VALIDACIONES */

document.addEventListener(
    "input",
    (e) => {

        if (e.target.id === "tarjeta") {

            e.target.value =
                e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 16);

        }

        if (
            e.target.id === "cvv"
        ) {

            e.target.value =
                e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 3);

        }

        if (
            e.target.id === "fechaPago"
        ) {

            let valor =
                e.target.value
                    .replace(/\D/g, "");

            if (
                valor.length > 2
            ) {

                valor =
                    valor.slice(0, 2)
                    + "/" +
                    valor.slice(2, 6);

            }

            e.target.value =
                valor.slice(0, 7);

        }

    });



function cerrarPago() {

    document
        .getElementById("pagoModal")
        .classList.remove("active");

}


async function procesarPago() {

    let tarjeta = document.getElementById("tarjeta").value;
    let fecha = document.getElementById("fechaPago").value;
    let cvv = document.getElementById("cvv").value;

    if (!tarjeta || !fecha || !cvv) {
        mostrarAlerta("Completa todos los campos");
        return;
    }

    let animacion = document.getElementById("animacionPago");

    animacion.innerHTML = `
        <div class="loader"></div>
        <p>Procesando pago...</p>
    `;

    document.getElementById("btnPagar").disabled = true;

    try {

        const BACKEND_STRIPE_URL = "https://capstone-001d.onrender.com";

        const response = await fetch(
            BACKEND_STRIPE_URL + "/create-payment-intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: precios
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            mostrarAlerta(data.error);
            document.getElementById("btnPagar").disabled = false;
            return;
        }

        console.log("PaymentIntent creado:", data.clientSecret);

        document.getElementById("tarjeta").style.display = "none";
        document.getElementById("fechaPago").style.display = "none";
        document.getElementById("cvv").style.display = "none";
        document.getElementById("btnPagar").style.display = "none";
        document.querySelector(".cancel").style.display = "none";

        animacion.innerHTML = `
            <div class="check"></div>

            <h3>Pago enviado a Stripe</h3>

            <p>${servicio}</p>
            <p>${selectedDate}</p>
            <p>${selectedHour}</p>
            <p>$${precios.toLocaleString("es-CL")}</p>

            <button onclick="irAgenda()">
                Ir a mis agendas
            </button>
        `;

        await fetch("/guardar/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                servicio: servicio,
                fecha: selectedDate,
                hora: selectedHour,
                precio: precios
            })
        });

        agregarNotif(
            "Reserva creada para " +
            selectedDate +
            " a las " +
            selectedHour
        );

        inicializarCalendarios();

    } catch (error) {

        console.log(error);
        mostrarAlerta("Error al conectar con Stripe");
        document.getElementById("btnPagar").disabled = false;

    }
}


function irAgenda() {

    cerrarPago();

    /* ocultar vistas */

    document
        .querySelectorAll(
            ".vista"
        )
        .forEach(x => {

            x.classList.add(
                "hidden"
            );

        });

    /* mostrar agenda */

    document
        .getElementById(
            "agenda"
        )
        .classList.remove(
            "hidden"
        );

    /* activar menú */

    document
        .querySelectorAll(
            ".nav-item"
        )
        .forEach(x => {

            x.classList.remove(
                "active"
            );

        });

    document
        .querySelectorAll(
            ".nav-item"
        )[2]
        .classList.add(
            "active"
        );


    /* limpiar y redibujar */

    inicializarCalendarios();

}

/* ===== ALERTA ===== */

function mostrarAlerta(texto) {

    let alerta =
        document.createElement(
            "div"
        );

    alerta.className =
        "alerta-personalizada";

    alerta.innerText =
        texto;

    document.body.appendChild(
        alerta
    );

    setTimeout(
        () => alerta.remove(),
        3000
    );

}



/* ===== ELIMINAR ===== */

function eliminarReserva(btn) {

    let confirmar =
        confirm(
            "¿Está seguro de eliminar la agenda?"
        );

    if (confirmar) {

        btn
            .closest(".agenda-card")
            .remove();

        mostrarAlerta(
            "Agenda eliminada"
        );

    }

}


/* ===== LOGOUT ===== */

function logout() {

  
    window.location.href = "";

}

function cambiarRegistro() {

    window.location.href =
        "/registro/";

}

function getCookie(nombre) {

    let valor = `; ${document.cookie}`;

    let partes =
        valor.split(
            `; ${nombre}=`
        );

    if (partes.length === 2) {

        return partes
            .pop()
            .split(";")
            .shift();

    }

}
