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

    this.description = `${this.workoutType[0].toUpperCase()}${this.workoutType.slice(
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
  #mapZoomLevel = 15;
  #map;
  #mapEvent;
  #workouts = []; // Private array to keep each "workout" on map

  workout;
  type;

  // "constructor" is activated immediately after a class object creation
  constructor() {
    this._getPosition();
    this._getLocalStorage();

    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    // "addEventListener" changes "this", so "bind()" has to return it the current class
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
    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling "click" on the map
    this.#map.on('click', this._showForm.bind(this));

    // Show markers of old starage data - AFTER "MAP" LOADING
    this.#workouts.forEach(workElm => this._renderWorkoutMarker(workElm));
  }

  _showForm(mapEvn) {
    this.#mapEvent = mapEvn;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value = '';
    inputDuration.value = '';
    inputCadence.value = '';
    inputElevation.value = '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
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

    // Render workout on list
    this._renderWorkout(this.workout);

    // Hide "form" and clear input fields
    this._hideForm();

    // Set Local Storage
    this._setLocalStorage();
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
      .setPopupContent(
        `${workoutInp.workoutType === 'running' ? '🏃‍♂️' : '🚴'} ${
          workoutInp.description
        }.`
      )
      .openPopup();
  }

  _renderWorkout(workoutInp) {
    let html = `<li class="workout workout--${
      workoutInp.workoutType
    }" data-id="${workoutInp.id}">
    <h2 class="workout__title">${workoutInp.description}</h2>
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
    </div>`;

    if (workoutInp.workoutType === 'running') {
      html += `<div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workoutInp.pace.toFixed(1)}</span>
    <span class="workout__unit">min/km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">🦶🏼</span>
    <span class="workout__value">${workoutInp.cadence}</span>
    <span class="workout__unit">spm</span>
  </div></li>`;
    }

    if (workoutInp.workoutType === 'cycling') {
      html += `<div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workoutInp.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workoutInp.elevationGain}</span>
      <span class="workout__unit">m</span>
    </div></li>`;
    }

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopup(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return; // To make to work only if "workoutEl" exist

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: {
        duration: 1.5, // animation option of duration movement
      },
    });
    // Here "map" is moving to the chosen workout box
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const localData = JSON.parse(localStorage.getItem('workouts'));
    if (!localData) return;

    this.#workouts = localData;

    this.#workouts.forEach(workElm => this._renderWorkout(workElm));
  }
}

const app = new App(); // Create a class instance
