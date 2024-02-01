'use strict';

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  const booking = {
    flightNum,
    numPassengers,
    price,
  };

  console.log(booking);
  bookings.push(booking);
};

createBooking('LH7203');
createBooking('LH7205', 2);
createBooking('LH7206', undefined, 1000);
createBooking('LH7207', undefined);
