import express from 'express';
import path from 'path';

export default function (
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  scenariosPath: string,
  route: string,
  filePath: string
): express.Express {
  const handler = (_: any, res: any): void => {
    const fullFilePath = path.join(scenariosPath, filePath);
    res.sendFile(fullFilePath);
  };

  return app[method](route, handler);
}
