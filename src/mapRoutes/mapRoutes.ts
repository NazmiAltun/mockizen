import path from 'path';
import express from 'express';
import { mapStatusCodeOnlyRoute } from './mapStatusCodeOnlyRoute';
import { mapStaticFileRoute } from './mapStaticFileRoute';

function map(server: express.Express, routes: Record<string, unknown>, currentPath: string): void {
  currentPath = currentPath || '';

  for (const key in routes) {
    switch (typeof routes[key]) {
      case 'object':
        map(server, routes[key] as Record<string, unknown>, currentPath + key);
        break;
      case 'number':
        let verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        const statusCode = routes[key] as number;
        mapStatusCodeOnlyRoute(server, verb, currentPath, statusCode);
        break;
      case 'string':
        verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        mapStaticFileRoute(server, verb, routes[key] as string, key);
        break;
      default:
        throw new Error(`Unknown value type ${typeof routes[key]}`);
    }
  }
}

export default async function mapRoutes(server: express.Express, scenariosPath: string): Promise<void> {
  const scenariosFullPath = path.resolve(process.cwd(), scenariosPath);
  const scenarios = await import(scenariosFullPath);
  map(server, scenarios.routes, '');
}

