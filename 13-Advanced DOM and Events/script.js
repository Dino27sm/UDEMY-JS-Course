'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (evn) {
  evn.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
////======================================================================
// Selecting Elements
//
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.querySelector('#section--1'));
// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByClassName('btn'));

const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// Creating and Inserting elements
// .insertAdjacentHTML - creates and inserts DOM elem defined by string

const message = document.createElement('div');
// "div" created but still not included into DOM

// message.classList.add('cookie-message'); // Class "cookie-message" added to new "div"
// // message.textContent = 'We use cookies to impruve functionality.';
// message.innerHTML = `We use cookies to impruve functionality.<button class="btn btn--close--cookie">Got it!</button>`;

// header.prepend(message); // Add it as FIRST child of "header" element
// header.append(message); // Add it as LAST child of "header" element
// header.append(message.cloneNode(true)); // To duplicate the same element

// header.before(message); // Place "message" before "header" as a sibling element
// header.after(message);  // Place "message" after "header" as a sibling element

// // Delete Elements -------------------------
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// // Styles -----------------------------------
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// console.log(message.style.color); // Prints out only inline style data
// console.log(message.style.backgroundColor);

// // To get style data from css file - use "getComputedStyle()"
// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// // Get style data from "css", convert it to number, add 30 px as correction and
// // send it into inline style of "message" element
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // Using of "CSS" properties (variables) defuined in ":root"
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes - Standard ------------------------------
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// // Non standard Attributes ----------------------------
// // "designer" is defined in "html" file as non standard attribute - use "getAttribute()"
// console.log(logo.getAttribute('designer'));

// // Classes --------------------------------------------
// logo.classList.add('test__class_name_1');
// // logo.classList.remove('test__class_name');
// logo.classList.toggle('test__class_name_2');
// console.log(logo.classList.contains('test__class_name_1'));
//
//======================= SMOOTH SCROLLING ============================
//
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (evn) {
  const s1coords = section1.getBoundingClientRect();
  // "getBoundingClientRect()" - to get coordinates of the element "section1"

  console.log(s1coords);
  console.log(evn.target.getBoundingClientRect()); // "btnScrollTo" coordinates
  // console.log(btnScrollTo.getBoundingClientRect()); // Like previous line

  //-------- To get position of scroling window
  // "scrollX" - distance from left; "scrollY" - distance from right of the page
  console.log('Get scrolling X/Y position: ', window.scrollX, window.scrollY);

  //------- To print out the dimensions of current viewport ---------
  console.log(
    'Height/Width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  //------- Smooth Scrolling
  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
});
