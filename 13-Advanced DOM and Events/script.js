'use strict';
//=====================================================
//
const h1 = document.querySelector('h1');
const section1 = document.querySelector('#section--1');

const tabbContainer = document.querySelector('.operations__tab-container');
const tabbContainerBtns = tabbContainer.querySelectorAll('.operations__tab');
const operationsContent = document.querySelectorAll('.operations__content');

const nav = document.querySelector('.nav');

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

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

// console.log(document.querySelector('#section--1'));
// console.log(document.getElementById('section--1'));
// console.log(document.getElementsByClassName('btn'));

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

// Creating and Inserting elements
// .insertAdjacentHTML - creates and inserts DOM elem defined by string

// const message = document.createElement('div');
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
// //======================= SMOOTH SCROLLING ============================
// //
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (evn) {
//   const s1coords = section1.getBoundingClientRect();
//   // "getBoundingClientRect()" - to get coordinates of the element "section1"

//   console.log(s1coords);
//   console.log(evn.target.getBoundingClientRect()); // "btnScrollTo" coordinates
//   // console.log(btnScrollTo.getBoundingClientRect()); // Like previous line

//   //-------- To get position of scroling window
//   // "scrollX" - distance from left; "scrollY" - distance from right of the page
//   console.log('Get scrolling X/Y position: ', window.scrollX, window.scrollY);

// //------- To print out the dimensions of current viewport ---------
// console.log(
//   'Height/Width of viewport',
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

// //------- Smooth Scrolling
// window.scrollTo({
//   left: s1coords.left + window.scrollX,
//   top: s1coords.top + window.scrollY,
//   behavior: 'smooth',
// });

//   //-------- BEST WAY to do SMOOTH SCROLLING -------------------
//   section1.scrollIntoView({ behavior: 'smooth' });
// });
// //======================================================================
// //------------- Type of EVENTS -----------------------------------------
// const h1 = document.querySelector('h1');

// const alertOverH1 = function () {
//   alert('Mouse was over h1 !');
// };

// h1.addEventListener('mouseenter', alertOverH1);

// // Removes the Event Listener after 5 seconds
// setTimeout(() => h1.removeEventListener('mouseenter', alertOverH1), 5000);
//
// //====================== EVENT PROPAGATION ============================
// const randomColor = function () {
//   const R = Math.floor(Math.random() * 256);
//   const G = Math.floor(Math.random() * 256);
//   const B = Math.floor(Math.random() * 256);
//   return `rgb(${R}, ${G}, ${B})`;
// };
// console.log(randomColor());

// const firstNavItem = document.querySelector('.nav__link');
// const allNavItems = document.querySelector('.nav__links');
// const navHeader = document.querySelector('.nav');

// firstNavItem.addEventListener('click', function (evn) {
//   // evn.target.setAttribute('style', `background-color: ${randomColor()}`);
//   this.setAttribute('style', `background-color: ${randomColor()}`);
//   evn.stopPropagation(); // To STOP Propagation
// });
// // "this" points to the element to which "addEventListener" is attached
// // Here "this" means the element "firstNavItem"

// allNavItems.addEventListener('click', function (evn) {
//   // evn.target.setAttribute('style', `background-color: ${randomColor()}`);
//   this.setAttribute('style', `background-color: ${randomColor()}`);
// });
// navHeader.addEventListener('click', function (evn) {
//   // evn.target.setAttribute('style', `background-color: ${randomColor()}`);
//   this.setAttribute('style', `background-color: ${randomColor()}`);
// });
// // "evn.target" gives the element which is clicked on !!!
//
// //======================= EVENT DELEGATION ===========================
// // 1. Add Event Listener to common parent element
// // 2. Find out the element on which the Event is created
// const navBar = document.querySelector('.nav__links');
// navBar.addEventListener('click', function (evn) {
//   evn.preventDefault();

//   if (evn.target.classList.contains('nav__link')) {
//     const idElm = evn.target.getAttribute('href');
//     // document.querySelector(`${idElm}`).scrollIntoView({ behavior: 'smooth' });
//     document.querySelector(idElm).scrollIntoView({ behavior: 'smooth' });
//   }
// });
// //========================= DOM Traversing ============================
// //------ Go down to CHILD Elements
// const h1 = document.querySelector('h1');
// console.log(h1);

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);

// h1.firstElementChild.setAttribute('style', 'color: white');
// h1.lastElementChild.setAttribute('style', 'color: orangered');
// //
// //------ Go up to PARENT Elements
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// h1.closest('.header').setAttribute(
//   'style',
//   'background: var(--gradient-secondary)'
// );

// h1.closest('h1').setAttribute('style', 'background: var(--gradient-primary)');
// //
// //-------- Go sideway to Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children); // To get all siblings of "h1"
//=================== Building a TABBED COMPONENT ===========================

tabbContainer.addEventListener('click', function (evn) {
  const clickedElm = evn.target.closest('.operations__tab');

  // If "clickedElm" is "null" or "undefined"
  if (!clickedElm) return;
  //-------------------------------------------

  tabbContainerBtns.forEach(elm =>
    elm.classList.remove('operations__tab--active')
  );
  clickedElm.classList.add('operations__tab--active');

  // Activate the Content area
  const dataTabNum = clickedElm.getAttribute('data-tab');
  operationsContent.forEach(elm =>
    elm.classList.remove('operations__content--active')
  );

  document
    .querySelector(`.operations__content--${dataTabNum}`)
    .classList.add('operations__content--active');

  // // Another way of solution ------------------------------
  // [...operationsContent]
  //   .find(elm => elm.classList.contains(`operations__content--${dataTabNum}`))
  //   .classList.add('operations__content--active');
  // //-------------------------------------------------------
});
//
//================ Passing Arguments to Event Handlers =================
// Menu Fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const navLinkAll = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    const opacityNum = Number(this);

    navLinkAll.forEach(function (elm) {
      if (elm !== link) {
        elm.setAttribute('style', `opacity: ${opacityNum}`);
      }
    });
    logo.setAttribute('style', `opacity: ${opacityNum}`);
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));
//
//============= STICKY NAVIGATION - Intersection Observer API ===============

const obsCallback = function (entries, observer) {
  entries.forEach(function (entry) {
    console.log(entry);
  });
};
const obsOptions = {
  root: null,
  threshold: 0.1,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(section1);
