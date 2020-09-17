import express from 'express';
import nocache from 'nocache';

export default function (server: express.Express): void {
  if (process.env.NOCACHE_DISABLED) {
    console.warn('Caching enabled.Requests will be cached');
  } else {
    console.warn('Caching disabled.Requests will be not be cached');
    server.use(nocache());
  }
}
