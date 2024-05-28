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

class App {
  // "constructor" is activated immediately after a class object creation
  constructor() {
    this._getPosition();
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this._loadMap, function () {
        alert('Cannot get your position!');
      });
    }
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    //--------------- Leaflet Map part ---------------------------------
    const coords = [latitude, longitude];
    map = L.map('map').setView(coords, 15);
    // console.log(map);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Handling "click" on the map
    map.on('click', function (mapEvn) {
      mapEvent = mapEvn;
      form.classList.remove('hidden');
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

const app = new App(); // Create a class object

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Clear the Input Fields
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      '';

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

inputType.addEventListener('change', function () {
  inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
});
