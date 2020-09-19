import express from 'express';
import path from 'path';
import vm from 'vm';
import fs from 'fs';
import { createSandbox, SandBox } from '../sandbox';

function runCodeInSandbox(filePath: string, fullFilePath: string): SandBox {
  const sandbox = createSandbox(filePath);
  const code = fs.readFileSync(fullFilePath, 'utf8');
  vm.runInNewContext(code, sandbox);
  return sandbox;
}

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
    const sanbox = runCodeInSandbox(filePath, fullFilePath);
    sanbox.module.exports.call(sanbox, req, res);
  };

  console.log(
    `Mapping js file. Method: ${method} route : ${route} filePath:${filePath}` +
      ` scenariosPath:${scenariosPath} fullFilePath: ${path.join(scenariosPath, filePath)}`
  );

  return app[method](route, handler);
}
