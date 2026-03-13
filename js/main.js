document.addEventListener("DOMContentLoaded", () => {
    // carrito (array)
    let productos = [];
    let cardProductos = JSON.parse(localStorage.getItem("cardProductos")) || [];

    // contenedor de productos
    const contenedorDeProductos = document.getElementById("productos");

    // ruta dinámica para el JSON
    const basePath = window.location.pathname.includes("/page/")
        ? "../assets/data/productos.json"
        : "assets/data/productos.json";

    // cargando productos desde JSON
    fetch(basePath)
        .then(response => response.json())
        .then(data => {
            productos = data;
            renderizarProductos(productos);
            actualizarContadorCarrito();
        })
        .catch(error => console.error("Error cargando productos:", error));

    // función para actualizar contador en el header
    function actualizarContadorCarrito() {
        const contador = document.getElementById("contador-carrito");
        if (contador) {
            contador.textContent = cardProductos.reduce((acc, p) => acc + p.cantidad, 0);
        }
    }

    // animar carrito
    function animarCarrito() {
        const carritoIcono = document.querySelector(".fa-shopping-cart");
        if (carritoIcono) {
            carritoIcono.classList.add("animar");
            setTimeout(() => carritoIcono.classList.remove("animar"), 500);
        }
    }

    // mostrar toast
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

    // renderizar productos en el DOM
    function renderizarProductos(array) {
        if (!contenedorDeProductos) return;
        contenedorDeProductos.innerHTML = "";
        array.forEach(producto => {
            let div = document.createElement("div");
            div.className = "producto";
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-img">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio}</p>

                <label>Talle:</label>
                <select class="talle">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select>

                <label>Color:</label>
                <select class="color">
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                    <option value="Azul">Azul</option>
                </select>

                <button class="agregar" id="${producto.id}">Agregar al carrito</button>
            `;
            contenedorDeProductos.appendChild(div);
            agregarProductos();
        });
    }

    // agregar productos al carrito
    function agregarProductos() {
        const botones = document.querySelectorAll(".agregar");
        botones.forEach(boton => {
            boton.onclick = (e) => {
                const productoId = e.currentTarget.id;
                const seleccionado = productos.find(producto => producto.id == productoId);

                const divProducto = e.currentTarget.closest(".producto");
                const talle = divProducto.querySelector(".talle").value;
                const color = divProducto.querySelector(".color").value;

                const existente = cardProductos.find(p => p.id == seleccionado.id && p.talle == talle && p.color == color);

                if (existente) {
                    existente.cantidad++;
                } else {
                    cardProductos.push({ ...seleccionado, cantidad: 1, talle, color });
                }

                localStorage.setItem("cardProductos", JSON.stringify(cardProductos));
                actualizarContadorCarrito();
                animarCarrito();
                mostrarToast(`${seleccionado.nombre} (${talle}, ${color}) agregado al carrito`);
            };
        });
    }

    // filtros con teclado
    document.addEventListener("keydown", (e) => {
        const instrucciones = document.getElementById("instrucciones");
        if (!contenedorDeProductos) return;

        if (e.key.toLowerCase() === "f") {
            const filtrados = productos.filter(producto => producto.precio > 5000);
            renderizarProductos(filtrados);
            if (instrucciones) instrucciones.textContent = "Filtro activo: mostrando productos con precio mayor a $5.000";
        }
        if (e.key.toLowerCase() === "r") {
            renderizarProductos(productos);
            if (instrucciones) instrucciones.textContent = "Filtro desactivado: mostrando todos los productos";
        }
    });

    // inicializar
    renderizarProductos(productos);
    actualizarContadorCarrito();

    // menú hamburguesa
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }
});
