function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      zoomControl: true,
      center: { lat: -33, lng: 151 },
      disableDefaultUI: true,
    });
  }
  
  window.initMap = initMap;