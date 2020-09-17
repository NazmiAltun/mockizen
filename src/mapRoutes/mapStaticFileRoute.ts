import express from 'express';
import path from 'path';

export function mapStaticFileRoute(
  app: express.Express,
  method: 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head',
  scenariosPath: string,
  route: string,
  filePath: string
): express.Express {
  const handler = (_: any, res: any): void => {
    const fullFilePath = path.join(scenariosPath, filePath);
    if (!process.env.LOGGING_DISABLED) {
      console.log(`Requesting static file. Method: ${method} route : ${route} path: ${filePath}`);
    }
    res.sendFile(fullFilePath);
  };
  console.log(
    `Mapping static file. Method: ${method} route : ${route} filePath:${filePath}` +
      ` scenariosPath:${scenariosPath} fullFilePath: ${path.join(scenariosPath, filePath)}`
  );

  return app[method](route, handler);
}
