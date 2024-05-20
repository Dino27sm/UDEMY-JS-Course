'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map;
let mapEvent;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      // console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      //--------------- Leaflet Map part ---------------------------------
      const coords = [latitude, longitude];
      map = L.map('map').setView(coords, 15);
      // console.log(map);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.tileLayer('https://tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      //   attribution:
      //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      // }).addTo(map);

      map.on('click', function (mapEvn) {
        mapEvent = mapEvn;
        form.classList.remove('hidden');
        inputDistance.focus();
      });

      //-----------------------------------------------------------------
    },
    function () {
      alert('Cannot get your position!');
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  //----- Display the Marker
  // Settings of message appearance on the map after clicking
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent(`Workout done👌`)
    .openPopup();
});
