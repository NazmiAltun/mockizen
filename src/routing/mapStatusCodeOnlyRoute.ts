import express, { Request, Response } from 'express';

export default function (
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  route: string,
  statusCode: number
): express.Express {
  const handler = (_: Request, res: Response): void => {
    res.sendStatus(statusCode);
  };

  return app[method](route, handler);
}
