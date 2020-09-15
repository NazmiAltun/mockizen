import express from 'express';

export function mapStatusCodeOnlyRoute(
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  route: string,
  statusCode: number
): express.Express {
  const handler = (_: any, res: any): void => {
    res.sendStatus(statusCode);
  };

  return app[method](route, handler);
}
