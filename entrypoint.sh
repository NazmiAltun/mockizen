#!/bin/sh
cp mocks/package.json .
yarn install --modules-folder temp_node_modules
cp -a temp_node_modules/. node_modules/
node --harmony dist/index.js