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

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
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

//   promiceJSON.then(function (jsonData) {
//     // "responseJSON" is required Data as array
//     renderCountry(jsonData[0]);
//   });
// };
//
//==================== Using arrow functions =================================
// const getCountryData = function (countryName) {
//   const promiceFetch = fetch(
//     `https://countries-api-836d.onrender.com/countries/name/${countryName}`
//   )
//     .then(response => response.json())
//     .then(data => renderCountry(data[0]));
// };
//============================================================================
//
// //=========================== Get Neighbour Country ==========================
// //
// const getCountryData = function (countryName) {
//   // Get Main (first) Country
//   const promiceFetch = fetch(
//     `https://countries-api-836d.onrender.com/countries/name/${countryName}`
//   );
//   const promiceJSON = promiceFetch.then(function (responseFetch) {
//     return responseFetch.json(); // "json()" returns a "promise"
//   });

//   // Get Neighbour (second) Country
//   const promisNeighbour = promiceJSON.then(function (jsonData) {
//     renderCountry(jsonData[0]);
//     const neighbour = jsonData[0].borders[0];
//     return fetch(
//       `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//     );
//   });
//   const promisNeighbourJSON = promisNeighbour.then(function (
//     responseNeighbour
//   ) {
//     return responseNeighbour.json();
//   });

//   // Render Neighbour Country
//   promisNeighbourJSON.then(function (neighbourData) {
//     renderCountry(neighbourData, 'neighbour');
//   });
// };
// //===========================================================================
//
// //================ Get Neighbour Country Using Array Functions =================
// //
// const getCountryData = function (countryName) {
//   fetch(`https://countries-api-836d.onrender.com/countries/name/${countryName}`)
//     .then(response => {
//       if (!response.ok) {
//         // Manually created Error to "throw"
//         throw new Error(
//           `Country "${countryName}" not found! --- ${response.status}`
//         );
//       }
//       return response.json();
//     }) // When the Promise is "fulfiled"
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[0];
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`
//       );
//     })
//     .then(resposeNeighbour => {
//       if (!resposeNeighbour.ok) {
//         // Manually created Error to "throw"
//         throw new Error(
//           `Neighbour country not found! --- ${resposeNeighbour.status}`
//         );
//       }
//       return resposeNeighbour.json();
//     })
//     .then(dataNeighbour => renderCountry(dataNeighbour, 'neighbour'))
//     .catch(err => {
//       // When the Promise is "rejected"
//       console.error(`${err}: 💥💥💥`);
//       renderError(`Something's gone wrong 💥💥💥 ${err.message}! Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// //===========================================================================

// btn.addEventListener('click', function () {
//   getCountryData('germany');
// });
//
// //===================== Coding CHALLENGE #1 ====================================
// //
// const whereAmI = function (lat, lng) {
//   const fetchPromise = fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=876344398626174668428x49381 `
//   );

//   fetchPromise
//     .then(gpsResponse => {
//       if (!gpsResponse.ok) {
//         console.log('Response of GeoCode is not OK!');
//         return;
//       }
//       return gpsResponse.json();
//     })
//     .then(gpsData => {
//       let cityName = gpsData.city;
//       let countryName = gpsData.country;
//       console.log(`You are in ${cityName}, ${countryName}.`);
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${countryName}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `Country "${countryName}" not found! --- ${response.status}`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       // When the Promise is "rejected"
//       console.error(`${err}: 💥💥💥`);
//       renderError(`Something's gone wrong 💥💥💥 ${err.message}! Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// //-----------------------------------------------------

// btn.addEventListener('click', function () {
//   whereAmI(52.508, 13.381);
//   whereAmI(42.69459, 23.32663);
//   whereAmI(-33.933, 18.474);
// });
// //============================= END of Coding Challenge #1 ==========================
//
// console.log('START the Test.');
// setTimeout(() => console.log('0 sec Timer.'), 1);
// Promise.resolve('Resolved Promise 1').then(res => console.log(res));

// Promise.resolve('Resolved Promise 2').then(res => {
//   for (let i = 0; i < 2500000000; i++) {} // Prevents the "timer" to result in 1 sec
//   console.log(res);
// });
// console.log('END the Test.'); // Second result - 2
// // MicroTasks have advantage before "Callback tasks"
//
// //=============== Lesson 260 - Building a Promise =====================================
// //
// const lotteryPromise = new Promise(function (resolve, reject) {
//   console.log('Start lottery draw!');

//   setTimeout(function () {
//     // To imitate Asynchronous behaviour by "setTimeout"
//     if (Math.random() >= 0.5) {
//       resolve('You Win!');
//     } else {
//       reject(new Error('You have lost the money!!!'));
//     }
//   }, 2000);
// });

// lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// // Promisifying "setTimeout"
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// wait(3).then(() => console.log('You waited for 3 sec.'));
// //
// //=============== Lesson 261 - Promisifying the Geolocation API ===================
// //
// // const getPosition = function () {
// //   return new Promise(function (resolve, reject) {
// //     navigator.geolocation.getCurrentPosition(
// //       position => resolve(position),
// //       err => reject(err)
// //     );
// //   });
// // };

// // Shorter way of the upper function "getPosition"
// //
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };
// // getPosition().then(pos => console.log(pos));
// //----------------------------------------------------------------------
// const whereAmI = function () {
//   getPosition()
//     .then(pos => {
//       const { latitude: lat, longitude: lng } = pos.coords;

//       return fetch(
//         `https://geocode.xyz/${lat},${lng}?geoit=json&auth=876344398626174668428x49381 `
//       );
//     })
//     .then(gpsResponse => {
//       if (!gpsResponse.ok) {
//         console.log('Response of GeoCode is not OK!');
//         return;
//       }
//       return gpsResponse.json();
//     })
//     .then(gpsData => {
//       let cityName = gpsData.city;
//       let countryName = gpsData.country;
//       console.log(`You are in ${cityName}, ${countryName}.`);
//       return fetch(
//         `https://countries-api-836d.onrender.com/countries/name/${countryName}`
//       );
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(
//           `Country "${countryName}" not found! --- ${response.status}`
//         );
//       }
//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//     })
//     .catch(err => {
//       // When the Promise is "rejected"
//       console.error(`${err}: 💥💥💥`);
//       renderError(`Something's gone wrong 💥💥💥 ${err.message}! Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
// //-----------------------------------------------------

// btn.addEventListener('click', whereAmI);

// //=============== Lesson 262 - Coding Challenge #2 ===================
// //
// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };

// const imgContainer = document.querySelector('.images');

// // Promisifying an Image loading ------------------------------
// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath; // Promisifying this Asynchronous process

//     img.addEventListener('load', function () {
//       imgContainer.append(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image tot found!'));
//     });
//   });
// };

// let currentImg;

// createImage('img/img-1.jpg')
//   .then(img => {
//     currentImg = img;
//     console.log('Image 1 loaded!');
//     return wait(3);
//   })
//   .then(() => {
//     // To hide the Image1 after 3 sec - return wait(3)
//     currentImg.style.display = 'none';

//     return createImage('img/img-2.jpg');
//   })
//   .then(img => {
//     currentImg = img;
//     console.log('Image 2 loaded!');
//     return wait(3);
//   })
//   .then(() => {
//     // To hide the Image2 after 3 sec - return wait(3)
//     currentImg.style.display = 'none';
//   })
//   .catch(err => console.error(err));
// //--------------------------------------------------------------
//
// //=============== Lesson 263 - Consuming Promises with Async Await ===================
// //
// const getPosition = function () {
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const whereAmI = async function () {
//   // GeoLocation
//   const position = await getPosition();
//   const { latitude: lat, longitude: lng } = position.coords;

//   // Reverse geocoding - locate the country by GPS data
//   const respGeo = await fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=876344398626174668428x49381`
//   );
//   const dataGeo = await respGeo.json();

//   // Country data in use
//   const response = await fetch(
//     `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
//   );

//   const data = await response.json(); // To get the "Promise" value

//   renderCountry(data[0]);
// };

// whereAmI();
// console.log('FIRST displyed!');
// //
//============== Lesson 264 - Error Handling with "Try / Catch" ===============
//
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Enter "try" block - Error here causes "catch" execution
    // GeoLocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding - locate the country by GPS data
    const respGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=876344398626174668428x49381`
    );
    if (!respGeo.ok) {
      // Error handling of "respGeo fetch"
      throw new Error(`Problems getting location! 💥`);
    }
    const dataGeo = await respGeo.json();

    // Country data in use
    const resCountry = await fetch(
      `https://countries-api-836d.onrender.com/countries/name/${dataGeo.country}`
    );
    if (!resCountry.ok) {
      // Error handling of "resCountry fetch"
      throw new Error(`Problems getting country name! 💥`);
    }
    const data = await resCountry.json(); // To get the "Promise" value

    renderCountry(data[0]);
  } catch (err) {
    // Executes this "catch" block if Error occurs in "try" block
    console.error(err);
    renderError(`💥${err.message} 💥`);
  }
};

whereAmI();
console.log('FIRST displyed!');
