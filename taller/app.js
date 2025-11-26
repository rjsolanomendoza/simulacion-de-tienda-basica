
// Formulario contacto
document.querySelector(".contact-form")?.addEventListener("submit", e => {
    e.preventDefault();
    alert("Tu mensaje ha sido enviado. ¡Gracias por contactarnos!");
});

// Métodos de pago simulados
document.querySelectorAll(".btn-pagar").forEach(btn => {
    btn.addEventListener("click", () => {
        const metodo = btn.dataset.metodo;
        alert(`Has seleccionado el método de pago: ${metodo}\n\nEsta es una simulación de pago`);
    });
});

// --- MODAL DE PAGO ---
const modal = document.getElementById("modalPago");
const cerrarModal = document.getElementById("cerrarModal");
const tituloMetodo = document.getElementById("tituloMetodo");
const contenidoPago = document.getElementById("contenidoPago");
const btnConfirmar = document.getElementById("btnConfirmarPago");

// Abrir modal según método
document.querySelectorAll(".btn-pagar").forEach(btn => {
    btn.addEventListener("click", () => {
        const metodo = btn.dataset.metodo;

        tituloMetodo.textContent = `Pagar con ${metodo}`;
        contenidoPago.innerHTML = generarContenido(metodo);

        modal.style.display = "flex";
    });
});

// Cerrar modal
cerrarModal.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Contenido dinámico según método de pago
function generarContenido(metodo) {

    if (metodo === "Tarjeta de Crédito") {
        return `
            <input class="input-pago" type="text" placeholder="Número de Tarjeta">
            <input class="input-pago" type="text" placeholder="Nombre del Titular">
            <input class="input-pago" type="text" placeholder="MM/AA">
            <input class="input-pago" type="text" placeholder="CVV">
        `;
    }

    if (metodo === "Nequi") {
        return `
            <p>Envia el valor al número <strong>300 123 4567</strong></p>
            <p>Tu pago será confirmado automáticamente.</p>
        `;
    }

    if (metodo === "Bancolombia") {
        return `
            <p>Realiza una transferencia a la cuenta:</p>
            <p><strong>Cuenta de Ahorros 123-456789-01</strong></p>
            <p>Banco: Bancolombia</p>
        `;
    }

    if (metodo === "PayPal") {
        return `
            <p>Serás redirigido a PayPal para completar la compra.</p>
        `;
    }

    return `<p>Método no disponible.</p>`;
}

// Confirmar pago (simulación)
btnConfirmar.addEventListener("click", () => {
    alert("Pago procesado exitosamente. Gracias por tu compra!");

    modal.style.display = "none";
});

// --- CARRITO ---
let carrito = [];

// Referencias del DOM
const btnCarrito = document.getElementById("btnCarrito");
const modalCarrito = document.getElementById("modalCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const totalCarrito = document.getElementById("totalCarrito");
const cantCarrito = document.getElementById("cantCarrito");
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");
const irAPagar = document.getElementById("irAPagar");

// Abrir Carrito
btnCarrito.addEventListener("click", () => {
    actualizarCarrito();
    modalCarrito.style.display = "flex";
});

// Cerrar Carrito
cerrarCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "none";
});

// Cerrar si clickea afuera
window.addEventListener("click", e => {
    if (e.target === modalCarrito) modalCarrito.style.display = "none";
});

// AGREGAR AL CARRITO
document.querySelectorAll(".btn-buy").forEach(btn => {
    btn.addEventListener("click", () => {
        const nombre = btn.dataset.nombre;
        const precio = parseInt(btn.dataset.precio);

        const producto = carrito.find(p => p.nombre === nombre);

        if (producto) {
            producto.cantidad++;
        } else {
            carrito.push({
                nombre,
                precio,
                cantidad: 1
            });
        }

        actualizarCarrito();
    });
});

// ACTUALIZAR CARRITO
function actualizarCarrito() {
    listaCarrito.innerHTML = "";

    carrito.forEach((p, index) => {
        listaCarrito.innerHTML += `
            <div class="item-carrito">
                <p><strong>${p.nombre}</strong></p>
                <p>Cantidad: ${p.cantidad}</p>
                <p>Precio: $${p.precio}</p>
                <button class="btn-eliminar" data-index="${index}">Eliminar</button>
            </div>
            <hr>
        `;
    });

    // Actualizar total y contador
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalCarrito.textContent = `Total: $${total}`;
    cantCarrito.textContent = carrito.length;

    // Eventos de eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", () => {
            const index = btn.dataset.index;
            carrito.splice(index, 1);
            actualizarCarrito();
        });
    });
}

// Vaciar carrito
vaciarCarritoBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// Ir a pagar 
irAPagar.addEventListener("click", () => {
    const metodo = document.getElementById("metodoPagoCarrito").value;

    if (metodo === "") {
        alert("Por favor selecciona un método de pago antes de continuar.");
        return;
    }

    // Cerrar carrito
    modalCarrito.style.display = "none";

    // Abrir modal de pago con el método seleccionado
    abrirModalPago(metodo);
});

function abrirModalPago(metodo) {
    const modal = document.getElementById("modalPago");
    const titulo = document.getElementById("tituloMetodo");
    const contenido = document.getElementById("contenidoPago");

    titulo.textContent = "Pagar con " + metodo;

    // GENERAR CONTENIDO SEGÚN EL MÉTODO
    switch (metodo) {
        case "Nequi":
            contenido.innerHTML = `
                <p>Envía el total al número:</p>
                <h3>300 123 4567</h3>
                <p>Luego sube captura del pago.</p>
            `;
            break;

        case "PayPal":
            contenido.innerHTML = `
                <p>Serás redirigido a PayPal para completar el pago.</p>
            `;
            break;

        case "Bancolombia":
            contenido.innerHTML = `
                <p>Realiza transferencia a:</p>
                <p><strong>Cuenta de Ahorros</strong></p>
                <p><strong>123-456789-01</strong></p>
            `;
            break;

        case "Tarjeta de Crédito":
            contenido.innerHTML = `
                <label>Número de tarjeta:</label>
                <input type="text" placeholder="0000 0000 0000 0000">

                <label>Fecha de expiración:</label>
                <input type="month">

                <label>CVC:</label>
                <input type="text" placeholder="123">
            `;
            break;
    }

    modal.style.display = "flex";
}


