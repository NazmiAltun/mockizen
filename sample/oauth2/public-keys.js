'use strict';

module.exports = function (req, res) {
  const keys = require('./keys');
  const JSONWebKey = require('json-web-key');
  
  res.json({
    "keys": [
      JSONWebKey.fromPEM(keys.public).toJSON()
    ]
  });
};