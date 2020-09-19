import fs from 'fs';
import cache from 'memory-cache';

export default async function (jsFileFullPath: string): Promise<string> {
  let code = cache.get(jsFileFullPath);
  if (code === null) {
    code = await fs.promises.readFile(jsFileFullPath, 'utf8');
  }
  return code;
}
