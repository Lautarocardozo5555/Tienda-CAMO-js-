document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("checkout-form");

function mostrarToast(mensaje, tipo = "error") {
    Toastify({
    text: mensaje,
    duration: 2000,
    gravity: "bottom",
    position: "right",
    backgroundColor: tipo === "success" ? "green" : "red",
    stopOnFocus: true
    }).showToast();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Datos personales
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();

    // Método de pago
    const metodoPago = document.getElementById("metodo-pago").value;

    // Validación dependiendo del método
    if (metodoPago === "tarjeta") {
    const tarjeta = document.getElementById("tarjeta").value.trim();
    const vencimiento = document.getElementById("vencimiento").value.trim();
    const cvv = document.getElementById("cvv").value.trim();

    if (tarjeta.length !== 16 || isNaN(tarjeta)) {
        mostrarToast("Número de tarjeta inválido");
        return;
    }
    if (!/^\d{2}\/\d{2}$/.test(vencimiento)) {
        mostrarToast("Formato de vencimiento inválido (MM/AA)");
        return;
    }
    if (cvv.length !== 3 || isNaN(cvv)) {
        mostrarToast("CVV inválido");
        return;
    }
    }

    if (metodoPago === "") {
    mostrarToast("Selecciona un método de pago");
    return;
    }

    // Guardando datos del comprador y productos
    const compraFinalizada = {
    comprador: { nombre, email, direccion, telefono },
    productos: JSON.parse(localStorage.getItem("cardProductos")) || [],
    fecha: new Date().toLocaleString(),
    metodoPago
    };

    try {
        localStorage.setItem("compraFinalizada", JSON.stringify(compraFinalizada));
        localStorage.removeItem("cardProductos");

    Swal.fire({
        title: "¡Pago exitoso!",
        html: `
            <p>Tu compra fue procesada correctamente con método: <strong>${metodoPago}</strong></p>
            <hr>
            <p style="color:#444; font-size:14px;">
            Por seguridad de ambas partes le solicitamos el envío del comprobante de pago a este número: 
            <strong>+54 9 351 6770681</strong>
            </p>
            `,
        icon: "success",
        confirmButtonText: "Ver comprobante de compra"
    }).then(() => {
        window.location.href = "gracias.html";
    });
    } catch (error) {
        console.error("Error guardando compraFinalizada:", error);
        Swal.fire({
        title: "Error",
        text: "No pudimos procesar tu compra. Intenta de nuevo.",
        icon: "error",
        confirmButtonText: "Cerrar"
    });
    } finally {
    console.log("Intento de guardar compraFinalizada ejecutado.");
    }
});


  // Mostrar/ocultar secciones de pago
    const metodoPagoSelect = document.getElementById("metodo-pago");
    const pagoTarjeta = document.getElementById("pago-tarjeta");
    const pagoTransferencia = document.getElementById("pago-transferencia");
    const pagoQR = document.getElementById("pago-qr");

    metodoPagoSelect.addEventListener("change", () => {
    pagoTarjeta.style.display = "none";
    pagoTransferencia.style.display = "none";
    pagoQR.style.display = "none";

    if (metodoPagoSelect.value === "tarjeta") pagoTarjeta.style.display = "block";
    if (metodoPagoSelect.value === "transferencia") pagoTransferencia.style.display = "block";
    if (metodoPagoSelect.value === "qr") pagoQR.style.display = "block";
});
});
