#!/bin/sh

if test -f "mocks/package.json"; then
  cp mocks/package.json mocks/package-lock.json mocks/yarn.lock . 2>/dev/null

  if test -f "yarn.lock"; then
    yarn install --modules-folder temp_node_modules
  else
    mv node_modules  temp_node_modules
    npm i
  fi
  cp -a temp_node_modules/. node_modules/  
fi
node --harmony dist/index.js