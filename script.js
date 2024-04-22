// Fungsi untuk menginisialisasi peta dan dashboard
function initMap() {
  // Lokasi awal peta
  var mymap = L.map('map').setView([-5.823249, 105.623132], 10);

  // Tambahkan basemap dari Leaflet
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(mymap);

  // Memuat data marker dari file JSON
  fetch('markers.json')
    .then((response) => response.json())
    .then((markersData) => {
      // Tambahkan marker berdasarkan data yang dimuat
      markersData.forEach(function (data) {
        var marker = L.marker([data.lat, data.lng]).addTo(mymap);
        marker.bindPopup('<b>' + data.label + '</b>');

        // Ketika marker diklik, tampilkan nama marker dan data pada dashboard
        marker.on('click', function (e) {
          document.getElementById('marker-name').innerHTML =
            '<strong>Buoy:</strong> ' + data.label;
          var dummyData = generateDummyData();
          showData(dummyData);
          marker.openPopup();
        });
      });
    })
    .catch((error) => console.error('Error loading markers:', error));

  // Panggil fungsi untuk memperbarui data dummy setiap 2 detik
  setInterval(updateData, 2000);
}

// Fungsi untuk menghasilkan data dummy
function generateDummyData() {
  return {
    windSpeed: Math.floor(Math.random() * 50) + 1,
    temperature: Math.floor(Math.random() * 40) + 20,
    seaLevel: Math.floor(Math.random() * 100) + 1,
  };
}

// Fungsi untuk memperbarui data dummy dan tampilkan pada dashboard
function updateData() {
  var dummyData = generateDummyData();
  showData(dummyData);
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
