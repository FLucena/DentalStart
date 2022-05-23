function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      zoomControl: true,
      center: { lat: -33, lng: 151 },
      disableDefaultUI: true,
    });
  }
  
  window.initMap = initMap;


/*
Validación del email:

Al hacer click en el botón "Enviar", se correrá la función "validateForm" que controlará que se hayan incluido

*/

const form = document.querySelector("form[name='miFormulario']");
const nameInput = document.querySelector("input[name='nombre']");
const emailInput = document.querySelector("input[name='email']");
const messageInput = document.querySelector("textarea[name='mensaje']");
const errorElement = document.getElementById('error')
const okElement = document.getElementById('ok')

form.addEventListener("submit", (e) => {
  let messages = [];
  if (nameInput.value === '' || nameInput.value == null) {
    messages.push('El nombre es requerido.');
  };
  if (emailInput.value === '' || emailInput.value == null) {
    messages.push('El email es requerido.');
  };
  if (messageInput.value === '' || messageInput.value == null) {
    messages.push('El mensaje es requerido.');
  };
  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(' ');
  }
  else {
    e.preventDefault();
    errorElement.innerText = "";
    okElement.innerText = "Mensaje enviado, ¡muchas gracias!";
    form.reset();
  };
});