import express, { Request, Response } from 'express';
import path from 'path';
import { runCodeInSandbox } from '../sandbox';

export default function (
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  scenariosPath: string,
  route: string,
  filePath: string
): express.Express {
  const fullFilePath = path.join(scenariosPath, filePath);

  const handler = async (req: Request, res: Response): Promise<void> => {
    const sanbox = await runCodeInSandbox(filePath, fullFilePath);
    sanbox.module.exports.call(sanbox, req, res);
  };

  return app[method](route, handler);
}
