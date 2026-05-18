const stripe = Stripe("pk_test_51TW91O48jN2dwE96Od0X6yS5yZWdDTgkIJTAcRJk7oV1HYZPlSTLnCbdTrRlvEOWnspd97T4cTlP8m37NbypTFrC00Zcnclc4I");

/* ===== LOGIN ===== */
let user = localStorage.getItem("user");
let active = sessionStorage.getItem("active");

if(!user || !active){
    window.location.href = "login.html";
}

document.getElementById("user-name").innerText = user;

/* ===== NOTIFICACIONES ===== */
const notifBtn = document.getElementById("notif");
const notifPanel = document.getElementById("notif-panel");
const notifCount = document.getElementById("notif-count");

function actualizarContador(){
    let notifs = JSON.parse(localStorage.getItem("notifs")) || [];
    notifCount.innerText = notifs.length;
}
actualizarContador();

/* abrir panel */
notifBtn.onclick = (e)=>{
    e.stopPropagation();

    let notifs = JSON.parse(localStorage.getItem("notifs")) || [];

    notifPanel.innerHTML = "";

    if(notifs.length === 0){
        notifPanel.innerHTML = "<p style='padding:10px;'>Sin notificaciones</p>";
    } else {
        notifs.forEach((n, index)=>{
            let div = document.createElement("div");
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            div.style.padding = "8px";
            div.style.borderBottom = "1px solid #eee";

            let text = document.createElement("span");
            text.innerText = n;

            let btn = document.createElement("button");
            btn.innerText = "🗑";
            btn.style.border = "none";
            btn.style.background = "transparent";
            btn.style.cursor = "pointer";

            btn.onclick = ()=>{
                eliminarNotificacion(index);
            };

            div.appendChild(text);
            div.appendChild(btn);

            notifPanel.appendChild(div);
        });
    }

    notifPanel.style.display = "block";
    notifCount.innerText = "0";
};

function eliminarNotificacion(index){
    let notifs = JSON.parse(localStorage.getItem("notifs")) || [];
    notifs.splice(index, 1);
    localStorage.setItem("notifs", JSON.stringify(notifs));
    actualizarContador();
    notifBtn.click();
}

/* cerrar panel */
document.addEventListener("click", (e)=>{
    if(!notifPanel.contains(e.target) && e.target !== notifBtn){
        notifPanel.style.display = "none";
    }
});

/* logout */
function logout(){
    sessionStorage.removeItem("active");
    window.location.href = "login.html";
}

/* ===== VISTAS ===== */
function cambiarVista(v){

    //  quitar active a todos
    document.querySelectorAll(".nav-item").forEach(x=>{
        x.classList.remove("active");
    });

    //  activar solo el clickeado
    event.currentTarget.classList.add("active");

    // cambiar vistas
    document.querySelectorAll(".vista").forEach(x=>x.classList.add("hidden"));
    document.getElementById(v).classList.remove("hidden");

    if(v === "agenda") cargarAgenda();
    if(v === "reservas") irPaso(1);
}

/* ===== VARIABLES ===== */
let servicio = "";
let selectedDate = "";
let selectedHour = "";
let precio = 0;

/* ===== SERVICIO ===== */
function seleccionarServicio(tipo){
    servicio = tipo;
    precio = (tipo === "Completo") ? 10 : 5;

    document.querySelectorAll(".servicio-box").forEach(x=>{
        x.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    actualizarResumen();
}

/* ===== HORAS ===== */
function selectHour(h){
    if(event.currentTarget.disabled) return;

    selectedHour = h;

    document.querySelectorAll(".hours button").forEach(btn=>{
        btn.classList.remove("active");
    });

    event.currentTarget.classList.add("active");

    actualizarResumen();
}

/* ===== RESUMEN ===== */
function actualizarResumen(){
    document.getElementById("res-servicio").innerText =
        servicio ? "Servicio: " + servicio : "Servicio: -";

    document.getElementById("res-fecha").innerText =
        selectedDate ? "Fecha: " + selectedDate : "Fecha: -";

    document.getElementById("res-hora").innerText =
        selectedHour ? "Hora: " + selectedHour : "Hora: -";
}

/* ===== PASOS ===== */
function irPaso(p){

    if(p === 2 && !servicio){
        alert("Selecciona un servicio");
        return;
    }

    if(p === 3 && (!selectedDate || !selectedHour)){
        alert("Selecciona fecha y hora");
        return;
    }

    document.querySelectorAll("#paso1,#paso2,#paso3,#paso4")
        .forEach(x=>x.classList.add("hidden"));

    document.getElementById("paso"+p).classList.remove("hidden");
}

/* ===== CALENDARIO ===== */
flatpickr("#calendarInput", {
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: function(_, dateStr){
        selectedDate = dateStr;
        selectedHour = "";
        actualizarResumen();
        bloquearHoras();
    }
});

/* ===== BLOQUEAR HORAS ===== */
function bloquearHoras(){

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    let ahora = new Date();
    let hoy = ahora.toISOString().split("T")[0];
    let horaActual = ahora.getHours();

    document.querySelectorAll(".hours button").forEach(btn=>{

        let texto = btn.innerText;
        let hora = parseInt(texto);

        if(texto.includes("PM") && hora !== 12) hora += 12;

        btn.disabled = false;
        btn.classList.remove("disabled");

        let ocupado = reservas.some(r =>
            r.fecha === selectedDate &&
            r.hora === btn.innerText.replace(" AM","").replace(" PM","")
        );

        let pasado = (selectedDate === hoy && hora <= horaActual);

        if(ocupado || pasado){
            btn.disabled = true;
            btn.classList.add("disabled");
        }
    });
}

/* ===== PAGO ===== */
function abrirPago(){

    if(!servicio || !selectedDate || !selectedHour){
        alert("Completa todos los datos");
        return;
    }

    document.getElementById("pagoTotal").innerText = "$" + precio + " USD";

    document.getElementById("pagoModal").classList.add("active");
}

function cerrarPago(){
    document.getElementById("pagoModal").classList.remove("active");

    //  restaurar formulario (importante)
    document.querySelector(".pago-box").innerHTML = `
        <h2>💳 Pago</h2>
        <p>Total: <strong id="pagoTotal">$${precio} USD</strong></p>
        <input type="text" placeholder="Número de tarjeta">
        <input type="text" placeholder="MM/AA">
        <input type="text" placeholder="CVV">
        <button onclick="procesarPago()">Pagar</button>
        <button onclick="cerrarPago()" class="cancel">Cancelar</button>
    `;
}

/* ===== PAGO CON ANIMACIÓN ===== */
async function procesarPago(){

    let inputs = document.querySelectorAll(".pago-box input");

    for(let input of inputs){

        if(input.value.trim() === ""){
            alert("Completa todos los datos");
            return;
        }

    }

    let box = document.querySelector(".pago-box");

    box.innerHTML = `
        <h3>Procesando pago...</h3>
        <div class="loader"></div>
    `;

    try {

        /* crear payment intent */
        const response = await fetch(
            "http://localhost:3000/create-payment-intent",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: precio * 100
                })
            }
        );

        const data = await response.json();

        /* pago test stripe */
        const result = await stripe.confirmCardPayment(
            data.clientSecret,
            {
                payment_method: {
                    card: {
                        token: "tok_visa"
                    }
                }
            }
        );

        if(result.error){

            console.log(result.error);

            alert("Pago rechazado");

            cerrarPago();

            return;

        }

        box.innerHTML = `
            <h3>Pago aprobado</h3>
            <div class="check"></div>
        `;

        setTimeout(()=>{

            cerrarPago();

            let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

            reservas.push({
                servicio,
                fecha: selectedDate,
                hora: selectedHour,
                precio
            });

            localStorage.setItem("reservas", JSON.stringify(reservas));

            let notifs = JSON.parse(localStorage.getItem("notifs")) || [];

            notifs.push("Reserva confirmada: " + servicio);

            localStorage.setItem("notifs", JSON.stringify(notifs));

            actualizarContador();

            document.getElementById("final-servicio").innerText =
                "Servicio: " + servicio;

            document.getElementById("final-fecha").innerText =
                "Fecha: " + selectedDate;

            document.getElementById("final-hora").innerText =
                "Hora: " + selectedHour;

            irPaso(4);

        }, 1200);

    } catch(err){

        console.log(err);

        alert("Error conectando con Stripe");

        cerrarPago();

    }
}
/* ===== AGENDA ===== */
function cargarAgenda(){

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    if(reservas.length === 0){
        lista.innerHTML = "<p>No tienes reservas aún</p>";
        return;
    }

    reservas.forEach((r, index)=>{

        let card = document.createElement("div");
        card.className = "reserva-card";

        card.innerHTML = `
            <button onclick="eliminarReserva(${index})">✖</button>

            <p><strong>Servicio:</strong> ${r.servicio}</p>
            <p><strong>Fecha:</strong> ${r.fecha}</p>
            <p><strong>Hora:</strong> ${r.hora}</p>
            <p><strong>Precio:</strong> $${r.precio}</p>
        `;

        lista.appendChild(card);
    });
}

function eliminarReserva(index){

    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

    reservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));

    let notifs = JSON.parse(localStorage.getItem("notifs")) || [];
    notifs.push("Reserva cancelada");
    localStorage.setItem("notifs", JSON.stringify(notifs));

    actualizarContador();

    cargarAgenda();
}

