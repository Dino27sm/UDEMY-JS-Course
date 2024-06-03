'use strict';

//=========================================================================
//

class Workout {
  date = new Date(); // Fields
  id = (Date.now() + '').slice(-10); // Fields
  workoutType;

  constructor(coords, distance, duration) {
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const typeString = String(this.workoutType);

    this.description = `${typeString[0].toUpperCase()}${typeString.slice(
      1
    )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration); // Initialize "this"
    this.cadence = cadence;
    this.calcPace();
    this.workoutType = 'running';
    this._setDescription();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration); // Initialize "this"
    this.elevationGain = elevationGain;
    this.calcSpeed();
    this.workoutType = 'cycling';
    this._setDescription();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration / 60); // Convert to hours
    return this.speed;
  }
}

//====================== Application Structure ===========================
// Class Definition with Properties & Methods
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
//------------------------------------------------------------------------

class App {
  #map;
  #mapEvent;
  #workouts = []; // Private array to keep each "workout" on map

  workout;
  type;

  // "constructor" is activated immediately after a class object creation
  constructor() {
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
  }

  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Cannot get your position!');
        }
      );
    }
  }

  _loadMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = [latitude, longitude];
    this.#map = L.map('map').setView(coords, 15);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling "click" on the map
    this.#map.on('click', this._showForm.bind(this));
  }

  _showForm(mapEvn) {
    this.#mapEvent = mapEvn;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    // Function to check if inputs are valid
    const validInputs = function (...inputs) {
      const result = inputs.every(inp => isFinite(inp));
      return result;
    };
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get the data from the "form"
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;

    this.type = inputType.value;

    // If workout "running", create "running" object
    if (this.type === 'running') {
      const cadence = Number(inputCadence.value);

      // Check the data if valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      ) {
        return alert('Enter positive numbers!');
      }
      this.workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout "cycling", create "cycling" object
    if (this.type === 'cycling') {
      const elevation = Number(inputElevation.value);

      if (
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      ) {
        return alert('Enter positive numbers!');
      }
      this.workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add the new object to workout array
    this.#workouts.push(this.workout);

    // Render workout on the map as marker
    this._renderWorkoutMarker(this.workout);
    console.log(this.workout);

    // Render workout on list
    this._renderWorkout(this.workout);

    // Hide "form" and clear input fields
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
  }

  _renderWorkoutMarker(workoutInp) {
    L.marker(workoutInp.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workoutInp.workoutType}-popup`,
        })
      )
      .setPopupContent(`Workout done👌`)
      .openPopup();
  }

  _renderWorkout(workoutInp) {
    let html = `<li class="workout workout--${
      workoutInp.workoutType
    }" data-id="${workoutInp.id}">
    <h2 class="workout__title">Running on April 14</h2>
    <div class="workout__details">
      <span class="workout__icon">${
        workoutInp.workoutType === 'running' ? '🏃‍♂️' : '🚴'
      }</span>
      <span class="workout__value">${workoutInp.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workoutInp.duration}</span>
      <span class="workout__unit">min</span>
    </div>
  </li>`;
  }
}

const app = new App(); // Create a class instance
