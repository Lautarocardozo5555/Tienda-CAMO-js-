
let cardProductos = JSON.parse(localStorage.getItem("cardProductos")) || [];

function actualizarCarrito() {
    const lista = document.getElementById("lista-carrito");
    lista.innerHTML = "";

    cardProductos.forEach(p => {
    let li = document.createElement("li");
    li.innerHTML = li.innerHTML = `
        <div class="carrito-item">
        <div class="carrito-info">
        <h4>${p.nombre}</h4>
        <p>Talle: ${p.talle}</p>
        <p>Color: ${p.color}</p>
        <p>Precio unitario: $${p.precio}</p>
       <p>Subtotal: $${p.precio * p.cantidad}</p>
        </div>
        <div class="carrito-controles">
        <button onclick="restar(${p.id})">−</button>
        <span class="cantidad">${p.cantidad}</span>
        <button onclick="sumar(${p.id})">+</button>
        <button class="eliminar" onclick="eliminar(${p.id})">Eliminar</button>
        </div>
        </div>
`;;
    lista.appendChild(li);
});

   const total = cardProductos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    document.getElementById("total").textContent = "Total: $" + total;
}

function sumar(id) {
    const producto = cardProductos.find(p => p.id === id);
    producto.cantidad++;
    guardarYActualizar();
}

function restar(id) {
    const producto = cardProductos.find(p => p.id === id);
    producto.cantidad--;
    if (producto.cantidad === 0) {
    cardProductos = cardProductos.filter(p => p.id !== id);
}
    guardarYActualizar();
}

function eliminar(id) {
    cardProductos = cardProductos.filter(p => p.id !== id);
    guardarYActualizar();
}

function vaciarCarrito() {
    cardProductos = [];
    guardarYActualizar();
}

function guardarYActualizar() {
    localStorage.setItem("cardProductos", JSON.stringify(cardProductos));
    actualizarCarrito();
}

// Finalizar compra
document.getElementById("pagar").onclick = () => {

    // Generar resumen
    let resumen = "Resumen de compra:\n";
    cardProductos.forEach(p => {
        resumen += `${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}\n`;
    });
    resumen += "Total: $" + cardProductos.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

    // Guardar historial
    let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push({ fecha: new Date().toLocaleString(), productos: [...cardProductos] });
    localStorage.setItem("historialCompras", JSON.stringify(historial));

    // Vaciar carrito y redirigir
    window.location.href = "checkout.html";
};


document.getElementById("vaciar").onclick = () => {
    Swal.fire({
    title: "¿Estás seguro?",
    text: "Se eliminarán todos los productos del carrito",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar"
}).then((result) => {
    if (result.isConfirmed) {
        vaciarCarrito();
        mostrarToast("Carrito vaciado", "success");
    }
});
};

// Inicializar
actualizarCarrito();