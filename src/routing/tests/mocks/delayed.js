'use strict';

const DELAY_MS = 100;

console.log('Before exports');

module.exports = function (req, res) {
  const getTime = require('./getTime');
  console.log(`Req: ${req}`);
  console.log(`Res: ${res}`);
  const start = getTime();
  setTimeout(() => {
    const end = getTime();
    res.json({ delayMs: end - start });
  }, DELAY_MS);
};
