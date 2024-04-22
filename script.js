// Fungsi untuk menginisialisasi peta dan dashboard
function initMap() {
  // Lokasi awal peta
  var mymap = L.map('map').setView([-5.823249, 105.623132], 10);

  // Tambahkan basemap dari Leaflet
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mymap);

  // Tambahkan multiple marker dengan data dummy
  var markersData = [
    { lat: -5.796003, lng: 105.569744, label: 'Marker 1' },
    { lat: -5.850495, lng: 105.67652, label: 'Marker 2' },
  ];

  markersData.forEach(function (data) {
    var marker = L.marker([data.lat, data.lng]).addTo(mymap);
    marker.bindPopup('<b>' + data.label + '</b>').openPopup();

    // Data dummy untuk setiap marker
    var dummyData = generateDummyData();

    // Ketika marker diklik, tampilkan data pada dashboard
    marker.on('click', function (e) {
      showData(dummyData);
    });
  });
}

// Fungsi untuk menghasilkan data dummy
function generateDummyData() {
  return {
    windSpeed: Math.floor(Math.random() * 50) + 1,
    temperature: Math.floor(Math.random() * 40) + 20,
    seaLevel: Math.floor(Math.random() * 100) + 1,
  };
}

// Fungsi untuk menampilkan data pada dashboard
function showData(data) {
  var dataContainer = document.getElementById('data-container');
  dataContainer.innerHTML = ''; // Hapus data sebelumnya

  // Tampilkan data
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      var dataItem = document.createElement('div');
      dataItem.classList.add('data-item');
      dataItem.innerHTML = `<strong>${key}:</strong> ${data[key]}`;
      dataContainer.appendChild(dataItem);
    }
  }
}

initMap(); // Panggil fungsi inisialisasi peta dan dashboard
