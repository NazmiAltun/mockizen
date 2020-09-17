"use strict";

function getRandomInt() {
  const max = 9007199254740990;
  return Math.floor(Math.random() * Math.floor(max));
}

module.exports = function (req, res) {
  res.json({
    Id: getRandomInt()
  });
};
