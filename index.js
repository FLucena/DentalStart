function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      zoomControl: true,
      center: { lat: -33, lng: 151 },
      disableDefaultUI: true,
    });
  }
  
  window.initMap = initMap;

  function validateForm() {
    let x = document.forms["miFormulario"]["email"].value;
    if (email.includes("@") == false) {
      alert("Por favor revisar que el email se haya completado correctamente.");
      console.log("Por favor revisar que el email se haya completado correctamente.")
      return false;
      }
  }