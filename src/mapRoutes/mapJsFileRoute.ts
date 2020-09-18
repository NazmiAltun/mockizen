import express from 'express';
import path from 'path';
import vm from 'vm';
import fs from 'fs';
import createSandbox from './createSandbox';

export default function (
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  scenariosPath: string,
  route: string,
  filePath: string
): express.Express {
  const fullFilePath = path.join(scenariosPath, filePath);

  const handler = (req: any, res: any): void => {
    if (!process.env.LOGGING_DISABLED) {
      console.log(`Requesting js file. Method: ${method} route : ${route} path: ${filePath}`);
    }
    //TODO: Cache
    const sandbox = createSandbox(filePath);
    const code = fs.readFileSync(fullFilePath, 'utf8');
    vm.runInNewContext(code, sandbox);
    sandbox.module.exports.call(sandbox, req, res);
  };

  console.log(
    `Mapping js file. Method: ${method} route : ${route} filePath:${filePath}` +
      ` scenariosPath:${scenariosPath} fullFilePath: ${path.join(scenariosPath, filePath)}`
  );

  return app[method](route, handler);
}
