'use strict';

module.exports = function (req, res) {
  const faker = require('faker');
  const jwt = require('jsonwebtoken');
  const keys = require('./keys');

  const expirationInSec = req.query.expirationInSec;

  const token = jwt.sign({
    email_verified : true,
    is_private_email: faker.random.boolean(),
    sub: faker.random.uuid(),
    email: faker.internet.email()
  },keys.private,{
     algorithm : 'RS256',
     expiresIn: `${expirationInSec}s`,
     issuer: 'https://token-issuer.com',
     audience:'sample-audience' });

  res.json({
    identityToken: token
  });
};