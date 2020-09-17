import fs from 'fs';
import path from 'path';
import express from 'express';
import { mapStatusCodeOnlyRoute } from './mapStatusCodeOnlyRoute';
import { mapStaticFileRoute } from './mapStaticFileRoute';

function map(server: express.Express, routes: Record<string, unknown>, currentRoute: string, dir: string): void {
  currentRoute = currentRoute || '';

  for (const key in routes) {
    switch (typeof routes[key]) {
      case 'object':
        map(server, routes[key] as Record<string, unknown>, currentRoute + key, dir);
        break;
      case 'number':
        let verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        const statusCode = routes[key] as number;
        mapStatusCodeOnlyRoute(server, verb, currentRoute, statusCode);
        break;
      case 'string':
        verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        mapStaticFileRoute(server, verb, dir, routes[key] as string);
        break;
      default:
        throw new Error(`Unknown value type ${typeof routes[key]}`);
    }
  }
}

export default async function mapRoutes(server: express.Express, scenariosPath: string): Promise<void> {
  try {
    const scenariosFullPath = path.resolve(process.cwd(), scenariosPath);
    if (fs.existsSync(scenariosFullPath)) {
      console.log(`Reading scenarios from file : ${scenariosFullPath}`);
    }
    const scenarios = await import(scenariosFullPath);
    map(server, scenarios.routes, '', path.dirname(scenariosFullPath));
  } catch (err) {
    console.error('Failed mapping routes');
    console.error(err);
  }
}
