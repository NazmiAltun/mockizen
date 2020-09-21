'use strict';
const faker = require('faker');

console.log('console.log works!', { data: 'data' });

module.exports = function (req, res) {
  res.json({
    userId: req.params.id,
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email()
  });
};
