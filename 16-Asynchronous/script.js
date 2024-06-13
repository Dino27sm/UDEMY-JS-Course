'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
const renderCountry = function (data, className = '') {
  // Here "data" is an object
  const peopleNum = (Number(data.population) / 1000000).toFixed(2);
  const html = `<article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
              <h3 class="country__name">${data.name}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${peopleNum} million</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
          </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};
//------------------------------------------------------------------
// //
// const getCountryAndNeighbour = function (country) {
//   // AJAX Call country-1
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://countries-api-836d.onrender.com/countries/name/${country}`
//   );
//   request.send();

//   request.addEventListener('load', function () {
//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     // Render country-1
//     renderCountry(data);

//     // Get neighbour country-2
//     const neighbour = data.borders[0];
//     if (!neighbour) return;
//     console.log(neighbour);
//     // AJAX Call country-1
//     const request2 = new XMLHttpRequest();
//     request2.open(
//       'GET',
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//     request2.send();
//     request2.addEventListener('load', function () {
//       const data2 = JSON.parse(this.responseText);

//       renderCountry(data2, 'neighbour');
//     });
//   });
// };

// // getCountryAndNeighbour('portugal');
// // getCountryAndNeighbour('bulgaria');
// getCountryAndNeighbour('usa');
//======================================================================
//
//=============== FETCH and PROMISES ===================================
//
// const request = fetch(
//   `https://countries-api-836d.onrender.com/countries/name/portugal`
// );
// // The "promis" is an object, used as a container to keep
// // the data receved via "fetch" asynchronously
// console.log(request);

// const getCountryData = function (countryName) {
//   const promiceFetch = fetch(
//     // "fetch" returns a "promise"
//     `https://countries-api-836d.onrender.com/countries/name/${countryName}`
//   );

//   const promiceJSON = promiceFetch.then(function (responseFetch) {
//     return responseFetch.json(); // "json()" returns a "promise"
//   });

//   promiceJSON.then(function (responseJSON) {
//     // "responseJSON" is required Data as array
//     renderCountry(responseJSON[0]);
//   });
// };
//
//==================== Using arrow functions =================================
const getCountryData = function (countryName) {
  const promiceFetch = fetch(
    `https://countries-api-836d.onrender.com/countries/name/${countryName}`
  )
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
//============================================================================
//
getCountryData('portugal');
