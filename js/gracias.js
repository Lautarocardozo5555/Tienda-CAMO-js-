document.addEventListener("DOMContentLoaded", () => {
  let compra = {};
  try {
    compra = JSON.parse(localStorage.getItem("compraFinalizada")) || {};
  } catch (error) {
    console.error("Error leyendo compraFinalizada:", error);
    compra = {};
  } finally {
    if (!compra.productos) compra.productos = [];
  }
  const productosComprados = compra.productos || [];
  const contenedor = document.getElementById("productos-comprados");
  const mensaje = document.getElementById("mensaje");

  // Datos del comprador
  if (compra.comprador) {
    mensaje.innerHTML += `
    <h1>¡Compra realizada con éxito!</h1>
    <p>Gracias por confiar en Tienda CAMO, esperamos que la compra haya sido de su agrado.</p>
      <h2>Datos del comprador</h2>
      <p><strong>Nombre:</strong> ${compra.comprador.nombre}</p>
      <p><strong>Email:</strong> ${compra.comprador.email}</p>
      <p><strong>Dirección:</strong> ${compra.comprador.direccion}</p>
      <p><strong>Teléfono:</strong> ${compra.comprador.telefono}</p>
      <p><strong>Fecha:</strong> ${compra.fecha}</p>
      <hr>
    `;
  }

  // Productos comprados
  productosComprados.forEach(p => {
    const div = document.createElement("div");
    div.className = "producto";
    div.innerHTML = `
      <img src="${p.imagen}" alt="${p.nombre}" class="producto-img">
      <h3>${p.nombre}</h3>
      <p>Talle: ${p.talle}</p>
      <p>Color: ${p.color}</p>
      <p>Cantidad: ${p.cantidad}</p>
      <p>Subtotal: $${p.precio * p.cantidad}</p>
    `;
    contenedor.appendChild(div);
  });


  // Botón para descargar comprobante
const botonDescargar = document.getElementById("descargar");
botonDescargar.addEventListener("click", () => {
      // Notificación con Toastify
    Toastify({
      text: "📄 Comprobante descargado",
      duration: 3000,
      gravity: "bottom",
      position: "right",
      backgroundColor: "#007bff",
      stopOnFocus: true
    }).showToast();
  botonDescargar.textContent = "Descargado ✅";
  botonDescargar.disabled = true;
});
//mostrando el comprobante con SweetAlwert
Swal.fire({
  title: "Comprobante de compra",
  html: `
    <p><strong>Nombre:</strong> ${compra.comprador?.nombre}</p>
    <p><strong>Email:</strong> ${compra.comprador?.email}</p>
    <p><strong>Fecha:</strong> ${compra.fecha}</p>
    <hr>
    ${compra.productos.map(p => `
      <p>${p.nombre} - ${p.talle}, ${p.color} x${p.cantidad} = $${p.precio * p.cantidad}</p>
    `).join("")}
  `,
  icon: "info",
  confirmButtonText: "Cerrar",
  allowOutsideClick: false,   
  allowEscapeKey: false       
}).then(() => {

  Toastify({
    text: "📦 Tu pedido está siendo preparado para el envío",
    duration: 4000,
    gravity: "bottom",
    position: "right",
    backgroundColor: "#28a745",
    stopOnFocus: true
  }).showToast();


  setTimeout(() => {
    Swal.fire({
      title: "¡Tu pedido está en camino! 🚚",
      html: `
        <p>Estamos preparando tu paquete con mucho cuidado.</p>
        <p><strong>Tiempo estimado de entrega:</strong> 3 a 5 días hábiles.</p>
        <p>Recibirás un correo con el número de seguimiento.</p>
      `,
      icon: "success",
      confirmButtonText: "Genial",
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }, 2000);
})


//feedback del usuario
const feedbackForm = document.getElementById("feedback-form");

feedbackForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const correo = document.getElementById("correo").value.trim();
  const opinion = document.getElementById("opinion").value.trim();


  Swal.fire({
    title: "¡Gracias por tu feedback!",
    html: `
      <p>Tu comprobante será enviado a: <strong>${correo}</strong></p>
      <p>Tu opinión: "${opinion}"</p>
    `,
    icon: "success",
    confirmButtonText: "Cerrar"
  });

  //guardando el feedback en localstorage
  try {
  let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  feedbacks.push({ correo, opinion, fecha: new Date().toLocaleString() });
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
} catch (error) {
  console.error("Error guardando feedback:", error);
  Swal.fire({ title: "Error", text: "No pudimos guardar tu feedback.", icon: "error" });
} finally {
  feedbackForm.reset();
}
});
const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
const feedbackList = document.getElementById("feedback-list");

feedbackList.innerHTML = "";
feedbacks.forEach(f => {
  const li = document.createElement("li");
  li.textContent = `${f.fecha} - ${f.correo}: ${f.opinion}`;
  feedbackList.appendChild(li);
});
});