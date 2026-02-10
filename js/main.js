/*Esta entrga va a constar de un simulador de mi primer proyecto (tienda camo)*/ 

//primer entrega

/*const productos =["pantalon","remera", "falda", "guantes", "short"]

let precios = {
    pantalon: 10000,
    remera: 4500,
    falda: 6000,
    guantes: 1500,
    short: 3500
};

function elegirProductos (productos) {
    let elegido = prompt(
        "Despues de tanto tiempo volvemos con los        descuentos en " + productos.join (", ") + "\n ¿Cúal de estos productos desea agregar a su carrito?"
    );

    // Si el usuario cancela, devolver null
    if (elegido === null) {
    return null;
    }

    return elegido.toLowerCase();
}
function procesarProducto(productoElegido, precios) {
    let precioBase = precios[productoElegido];
    let descuento = 0.2;
    let precioFinal = precioBase - (precioBase * descuento);
    let cantidad = pedirCantidad(productoElegido);
    let subtotal = precioFinal * cantidad;

    alert("El producto elegido es " + productoElegido + 
        "\n Cantidad: " + cantidad + 
        "\n Precio unitario con descuento: $" + precioFinal + 
        "\n Subtotal: $" + subtotal);

    return { cantidad, subtotal };
}

let continuar = true;
let carrito = [];
let total = 0;

while (continuar) {
    let productoElegido = elegirProductos(productos);

    if (productoElegido === null) {
    // El usuario canceló el prompt → cortar el ciclo
    continuar = false;
    break;
}
if (productos.includes(productoElegido)) {
        let { cantidad, subtotal } = procesarProducto(productoElegido, precios);

        carrito.push(productoElegido + " x" + cantidad);
        total += subtotal;



    //eliminamos el producto del array

    let indice = productos.indexOf(productoElegido);
    productos.splice(indice,1);

    alert("La lista actualizada es " + productos.join(", "))
} else{
    alert("Ese producto no tiene descuento o no está en stock")
}

if (productos.length > 0) {
    continuar = confirm("¿Desea agregar mas productos a su carrito?");
} else{
    alert("¡Ya no tenemos mas productos en descuento!")
}
}

total = medioDePago (total);

alert(
    "Gracias por visitar Tienda CAMO." + "\n Los productos que agregaste a tu carrito: " + carrito.join(", ") + "\n Total a pagar: $" + total
);
console.log("Carrito final:" + carrito);
console.log("Total a pagar: $" + total)

//elegir la cantidad de productos que desea comprar el usuario

function pedirCantidad(productos) {
    let cantidad = parseInt(prompt("¿Cuántas unidades de " + productos + " desea agregar a su carrito?"));

    if(isNaN(cantidad) || cantidad <= 0){
    alert("Cantidad inválida. Se asignará 1 por defecto.");
    return 1;
}
    return cantidad;
}

//metodo de pago
function medioDePago (total) {
    let opcion = parseInt(prompt("Seleccione medio de pago:\n1 - Efectivo (10% descuento)\n2 - Tarjeta (sin descuento)\n3 - Transferencia (5% descuento)"))
    switch(opcion){
        case 1:
             let descuentoEfectivo = total * 0.10;
            alert("Pagando en efectivo tenes un descuento de: $" + descuentoEfectivo + "\n Total final: $" + (total - descuentoEfectivo));
            return total - descuentoEfectivo;

        case 2:
            alert ("Pagando con tarjeta no hay descuento.\n Total final: $" + total)
            return total;

        case 3: 
            let descuentoTransferencia = total *0.05;
            alert("Pagando con transferencia tenes un descuento de: $" + descuentoTransferencia +"\n Total final: $" + (total - descuentoTransferencia));
            return total - descuentoTransferencia

        default: 
            alert("Opción inválida. Se mantiene el total sin descuento: $" + total);
            return total
    }
}
*/

//segunda entrega

//array de objetos literales

const productos= [
    {
        id:1, 
        nombre: "pantalon", 
        precio: 10000,
        imagen: "./assets/img/pantalonsastrero-camo.jpg"
    },
    {   
        id:2, 
        nombre:"remera", 
        precio: 4500,
        imagen: "./assets/img/remera-camo.jpg"
    },
    {   
        id:3, 
        nombre: "falda", 
        precio: 6000,
        imagen: "./assets/img/faldasastrera-camo.jpg"
    },
    {   
        id:4, 
        nombre: "guantes", 
        precio:1500,
        imagen: "./assets/img/guantes-camo.jpg"
    },
    {   
        id:5, 
        nombre: "short", 
        precio: 3500,
        imagen: "./assets/img/shortsastrero-camo.jpg"
    },
];

//carrito (array)

let cardProductos = JSON.parse(localStorage.getItem("cardProductos")) || []

//contenedor de productos
const contenedorDeProductos = document.getElementById("productos");

//renderizar productos en el DOM

function renderizarProductos (array) {
    array.forEach(producto => {
        let div = document.createElement("div");
        div.className = "producto"
        div.innerHTML =`<img src="${producto.imagen} "alt="${producto.nombre}" class="producto-img">
                        <h3>${producto.nombre}</h3>
                        <p>$${producto.precio}</p>
                        <button class="agregar" id="${producto.id}">Agregar al carrito</button>
                        `
    contenedorDeProductos.appendChild(div)
    })
}

//agregar productos al carrito

function agregarProductos () {
    const botonAgregar = document.querySelectorAll(".agregar")
    botonAgregar.forEach(boton => {
        boton.onclick = (e) => {
            const productoId = e.currentTarget.id
            const seleccionarProductos= productos.find(producto => producto.id == productoId)
            
            const existente = cardProductos.find(producto=> producto.id == seleccionarProductos.id)
            if(existente) {
                existente.cantidad +=1;
            } else {
                cardProductos.push({...seleccionarProductos, cantidad: 1}) 
            }

            const mensaje = document.getElementById("mensaje-compra")
            mensaje.textContent = ""

                localStorage.setItem("cardProductos", JSON.stringify(cardProductos))
        actualizarCarrito();
        } 
        
    })
}

// lógica para eliminar productos
function eliminarProductos() {
    const botonesEliminar = document.querySelectorAll(".eliminar");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const producto = cardProductos.find(producto =>producto.id == id);

            if (producto) {

                producto.cantidad -= 1;

                if (producto.cantidad === 0) {
                    cardProductos = cardProductos.filter(producto => producto.id != id);
                }

                localStorage.setItem("cardProductos", JSON.stringify(cardProductos));

                actualizarCarrito();
            }
        });
    });
}
//actualizar carrito en el DOM

function actualizarCarrito () {
    const listaCarrito = document.getElementById("carrito");
    listaCarrito.innerHTML = "";

    cardProductos.forEach(producto => {
        let li = document.createElement("li");
        li.innerHTML = `
            ${producto.nombre} x${producto.cantidad} - $${producto.precio * producto.cantidad}
            <button class="eliminar" data-id="${producto.id}">Eliminar</button>
        `;
        listaCarrito.appendChild(li);
    });

    const total = cardProductos.reduce((acumulador, producto) => acumulador + (producto.precio * producto.cantidad), 0);
    document.getElementById("total").textContent = "Total: $" + total;

    eliminarProductos();
}

//evento para finalizar la compra
document.getElementById("pagar").addEventListener("click", () =>{
        let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
    historial.push({
        fecha: new Date().toLocaleString(),
        productos: [...cardProductos]
    });
    localStorage.setItem("historialCompras", JSON.stringify(historial));

    cardProductos = []
    localStorage.removeItem("cardProductos")
    actualizarCarrito()

    const mensaje = document.getElementById("mensaje-compra")
    mensaje.textContent = "Gracias por su compra, esperamos que Tienda CAMO haya sido de su agrado. Vuelva pronto!!"
})

//utilizando el evento keydown

document.addEventListener("keydown", (e) => {
    const instrucciones = document.getElementById("mensaje-compra");

    if (e.key.toLowerCase() === "f") {
        const filtrados = productos.filter(producto => producto.precio > 5000);
        contenedorDeProductos.innerHTML = "";
        renderizarProductos(filtrados);
        agregarProductos();

        instrucciones.textContent = "Filtro activo: mostrando productos con precio mayor a $5000";

        setTimeout(() => {
            instrucciones.textContent = "";
        }, 3000);
    }

    if (e.key.toLowerCase() === "r") {
        contenedorDeProductos.innerHTML = "";
        renderizarProductos(productos);
        agregarProductos();

        instrucciones.textContent = "Filtro desactivado: mostrando todos los productos";

        setTimeout(() => {
            instrucciones.textContent = "";
        }, 3000);
    }
});
console.log(instrucciones)
//inicializar
renderizarProductos(productos);
agregarProductos();
actualizarCarrito();




// menú hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector("nav ul");

menuToggle.addEventListener("click", () => {
navMenu.classList.toggle("active");
});
