'use strict';

const cache = require('memory-cache');
const _ = require('testokur-utils');
let keys = cache.get('keys');

if(_.isNil(keys)){
  const keypair = require('keypair');
  keys = keypair();
  cache.put('keys',keys);
}

module.exports = keys;