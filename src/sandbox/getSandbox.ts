import cache from 'memory-cache';
import { isNil } from 'testokur-utils';
import SandBox from './sandBox';
import createSandbox from './createSandbox';

export default function (fullFilePath: string, filePath: string): SandBox {
  let sandbox = cache.get(filePath);
  if (isNil(sandbox)) {
    sandbox = createSandbox(fullFilePath, filePath);
  }
  return sandbox;
}
