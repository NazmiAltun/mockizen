import express from 'express';
import path from 'path';

export function mapStaticFileRoute(
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  scenariosPath: string,
  route: string
): express.Express {
  const handler = (_: any, res: any): void => {
    const filePath = path.join(__dirname, scenariosPath, route);
    res.sendFile(filePath);
  };

  return app[method](route, handler);
}
