'use strict';

const DELAY_MS = 100;

console.log('Before exports');

module.exports = function (req, res) {
  console.log(`Req: ${req}`);
  console.log(`Res: ${res}`);
  const start = new Date().getTime();
  setTimeout(() => {
    const end = new Date().getTime();
    res.json({ delayMs: end - start });
  }, DELAY_MS);
};
