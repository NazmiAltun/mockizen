import fs from 'fs';
import cache from 'memory-cache';
import { isNil } from 'testokur-utils';

export default async function (jsFileFullPath: string): Promise<string> {
  let code = cache.get(jsFileFullPath);
  if (isNil(code)) {
    code = await fs.promises.readFile(jsFileFullPath, 'utf8');
  }
  return code;
}
