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
    if (!process.env.LOGGING_DISABLED) {
      console.log(`Requesting static file. Method: ${method} route : ${route} path: ${filePath}`);
    }
    res.sendFile(filePath);
  };
  console.log(`Mapping static file. Method: ${method} route : ${route} path: ${path.join(__dirname, scenariosPath, route)}`);

  return app[method](route, handler);
}
