# Mockizen

![CI](https://github.com/NazmiAltun/mockizen/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/NazmiAltun/mockizen/branch/master/graph/badge.svg)](https://codecov.io/gh/NazmiAltun/mockizen)
[![BCH compliance](https://bettercodehub.com/edge/badge/NazmiAltun/mockizen?branch=master)](https://bettercodehub.com/)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=NazmiAltun_mockizen&metric=bugs)](https://sonarcloud.io/dashboard?id=NazmiAltun_mockizen)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=NazmiAltun_mockizen&metric=code_smells)](https://sonarcloud.io/dashboard?id=NazmiAltun_mockizen)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=NazmiAltun_mockizen&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=NazmiAltun_mockizen)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=NazmiAltun_mockizen&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=NazmiAltun_mockizen)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=NazmiAltun/mockizen)](https://dependabot.com)

Mockizen is a minimal mock http server that can run anywhere and exposes predefined endpoints. Built with node webframework [Express](https://expressjs.com/).
Mockizen docker image is built on top of Node Alpine image and has 40 Mb image size when compressed.

## How To Use

Mockizen reads routes from **scenarios.json** file. First create scenarios.json file. Here is a sample :

```json
{
  "routes": {
    "/live": {
      "get": 200
    },
    "/api/v1/user": {
      "get": "user-get.js",
      "post": "user-post.js",
      "delete": 202
    },
    "/userlist": {
      "get": "users.json"
    },
    "/some-image.png": {
      "get": "path/route-to-image.png"
    },
    "/v1/:production-id": {
      "post": "production.js",
      "/details": {
        "get": "production-details.js"
      }
    }
  }
}
```

For more details about routing please take a look at [express routing guide](https://expressjs.com/en/guide/routing.html)

There are three ways to mock an endpoint:

1. Declaring HTTP status code. (e.g "get" : 200) : Will return status code with empty or dummy body.
2. Static file/content (e.g "get" : "image.png" ) : Will return static file
3. Javascript file (e.g "post":"user.js" ) : Will execute javascript file. Javascript file should be in following format ;

```js
module.exports = function (req, res) {
  // Read request
  // ....
  // Set response
};
```

And run with docker

```sh
docker run -p  9155:8080 -v  {DIR_CONTAINS_SCENARIONS_JSON_AND_OTHER_MOCK_FILES}:/opt/app/mocks nazmialtun/mockizen:latest
```

Feel free to contribute
