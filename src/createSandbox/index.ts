import path from 'path';

const whiteList: Set<string> = new Set<string>();
whiteList.add('encodeURI');
whiteList.add('Date');
whiteList.add('parseFloat');
whiteList.add('Set');
whiteList.add('Proxy');
whiteList.add('Array');
whiteList.add('Function');
whiteList.add('Boolean');
whiteList.add('unescape');
whiteList.add('encodeURIComponent');
whiteList.add('Symbol');
whiteList.add('decodeURIComponent');
whiteList.add('Promise');
whiteList.add('isFinite');
whiteList.add('decodeURI');
whiteList.add('Error');
whiteList.add('String');
whiteList.add('Number');
whiteList.add('isNaN');
whiteList.add('RegExp');
whiteList.add('Map');
whiteList.add('parseInt');
whiteList.add('Object');
whiteList.add('escape');
whiteList.add('Buffer');
whiteList.add('clearImmediate');
whiteList.add('clearInterval');
whiteList.add('clearTimeout');
whiteList.add('setImmediate');
whiteList.add('setInterval');
whiteList.add('setTimeout');

export function createSandbox(filePath: string, basePath: string) {
  const fileDirname = path.parse(filePath).dir;
  const newRequire = function require(modPath: string, basePath: string, fileDirname: string) {
    let resolved = modPath;
    if (path.parse(modPath).dir !== '') {
      resolved = path.resolve(basePath, modPath);
    }
    try {
      return module.require(resolved);
    } catch (e) {
      resolved = path.resolve(fileDirname, modPath);
      return module.require(resolved);
    }
  };
  const base = Object
    .getOwnPropertyNames(global)
    .filter(name => whiteList.has(name))
    .reduce((sbx, _) => {
      //  sbx[name] = global[name];
      return sbx;
    }, {});

  const sandbox = Object.assign(base, {
    __dirname: fileDirname,
    require: newRequire,
    module: {
      exports: {},
      require: newRequire,
    },
    console: {
      log: (line: string) => {
        console.log.apply(console, [
          `(log: ${path.relative(basePath, filePath)}) ${line}`
        ])
      }
    }
  });
  return sandbox;
}