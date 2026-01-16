/*Esta entrga va a constar de un simulador de mi primer proyecto (tienda camo)*/ 
const productos =["pantalon","remera", "falda", "guantes", "short"]

let precios = {
    pantalon: 10000,
    remera: 4500,
    falda: 6000,
    guantes: 1500,
    short: 3500
};

function elegirProductos (productos){
let elegido = prompt("Despues de tanto tiempo volvemos con los descuentos en " + productos.join (", ") + "\n ¿Cúal de estos productos desea agregar a su carrito?");
// Si el usuario cancela, devolver null
if (elegido === null) {
return null;
}

return elegido.toLowerCase();
}

let continuar = true;
let carrito = [];
let total = 0;

while(continuar){
let productoElegido = elegirProductos(productos);
if (productoElegido === null) {
// El usuario canceló el prompt → cortar el ciclo
continuar = false;
break;
}


if(productos.includes(productoElegido)){
let precioBase = precios[productoElegido]
let descuento = 0.2;
let precioFinal = precioBase - (precioBase * descuento);
let cantidad = pedirCantidad(productoElegido);
let subtotal = precioFinal * cantidad
alert("El producto elegido es " + productoElegido + "\n Cantidad: " + cantidad + "\n Precio unitario con descuento: $" + precioFinal + "\n Subtotal: $" + subtotal);

carrito.push(productoElegido + " x" + cantidad);
total += subtotal;
//eliminamos el producto del array
let indice = productos.indexOf(productoElegido);
productos.splice(indice,1);
alert("La lista actualizada es " + productos.join(", "))
} else{
alert("Ese producto no tiene descuento o no está en stock")
}
if(productos.length>0){
continuar = confirm("¿Desea agregar mas productos a su carrito?");
} else{
alert("¡Ya no tenemos mas productos en descuento!")
}
}
total = medioDePago (total);
alert("Gracias por visitar Tienda CAMO." + "\n Los productos que agregaste a tu carrito: " + carrito.join(", ") + "\n Total a pagar: $" + total)
console.log("Carrito final:" + carrito);
console.log("Total a pagar: $" + total)

//elegir la cantidad de productos que desea comprar el usuario
function pedirCantidad(productos){
let cantidad = parseInt(prompt("¿Cuántas unidades de " + productos + " desea agregar a su carrito?"));
if(isNaN(cantidad) || cantidad <=0){
alert("Cantidad inválida. Se asignará 1 por defecto.");
return 1;
}
return cantidad;
}

//metodo de pago
function medioDePago (total){
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
