import express from 'express';
import { mapStatusCodeOnlyRoute } from './mapStatusCodeOnlyRoute';
import { mapStaticFileRoute } from './mapStaticFileRoute';

export default function mapRoutes(app: express.Express, routes: Record<string, unknown>, currentRoute: string, dir: string): void {
  currentRoute = currentRoute || '';

  for (const key in routes) {
    switch (typeof routes[key]) {
      case 'object':
        mapRoutes(app, routes[key] as Record<string, unknown>, currentRoute + key, dir);
        break;
      case 'number':
        let verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        const statusCode = routes[key] as number;
        mapStatusCodeOnlyRoute(app, verb, currentRoute, statusCode);
        break;
      case 'string':
        verb = key as 'all' | 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head';
        mapStaticFileRoute(app, verb, dir, currentRoute, routes[key] as string);
        break;
      default:
        throw new Error(`Unknown value type ${typeof routes[key]}`);
    }
  }
}
