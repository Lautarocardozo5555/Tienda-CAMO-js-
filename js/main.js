document.addEventListener("DOMContentLoaded", () => {
    let cardProductos = JSON.parse(localStorage.getItem("cardProductos")) || [];

    function actualizarContadorCarrito() {
        const contador = document.getElementById("contador-carrito");
        if (contador) {
            contador.textContent = cardProductos.reduce((acc, p) => acc + p.cantidad, 0);

            // feedback visual cada vez que se actualiza
            animarCarrito();
            mostrarToast("Carrito actualizado", "success");
        }
    }

    function animarCarrito() {
        const carritoIcono = document.querySelector(".fa-shopping-cart");
        if (carritoIcono) {
            carritoIcono.classList.add("animar");
            setTimeout(() => carritoIcono.classList.remove("animar"), 500);
        }
    }

    function mostrarToast(mensaje, tipo = "success") {
        Toastify({
            text: mensaje,
            duration: 2000,
            gravity: "bottom",
            position: "right",
            backgroundColor: tipo === "success" ? "green" : "red",
            stopOnFocus: true
        }).showToast();
    }

    // inicializar contador con feedback
    actualizarContadorCarrito();

    // menú hamburguesa
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            mostrarToast("Menú desplegado", "success");
        });
    }
});