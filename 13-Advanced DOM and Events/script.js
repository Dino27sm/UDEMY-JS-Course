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

message.classList.add('cookie-message'); // Class "cookie-message" added to new "div"
// message.textContent = 'We use cookies to impruve functionality.';
message.innerHTML = `We use cookies to impruve functionality.<button class="btn btn--close--cookie">Got it!</button>`;

// header.prepend(message); // Add it as FIRST child of "header" element
header.append(message); // Add it as LAST child of "header" element
// header.append(message.cloneNode(true)); // To duplicate the same element

// header.before(message); // Place "message" before "header" as a sibling element
// header.after(message);  // Place "message" after "header" as a sibling element

// Delete Elements
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

// Styles
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style.color); // Prints out only inline style data
console.log(message.style.backgroundColor);

// To get style data from css file - use "getComputedStyle()"
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
