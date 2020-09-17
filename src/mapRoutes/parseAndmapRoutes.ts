import fs from 'fs';
import path from 'path';
import express from 'express';
import mapRoutes from './mapRoutes';

export default async function parseAndmapRoutes(app: express.Express, scenariosPath: string): Promise<void> {
  try {
    const scenariosFullPath = path.resolve(process.cwd(), scenariosPath);
    if (fs.existsSync(scenariosFullPath)) {
      console.log(`Reading scenarios from file : ${scenariosFullPath}`);
    }
    const scenarios = await import(scenariosFullPath);
    mapRoutes(app, scenarios.routes, '', path.dirname(scenariosFullPath));
  } catch (err) {
    console.error('Failed mapping routes');
    console.error(err);
  }
}
