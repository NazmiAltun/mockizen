import cache from 'memory-cache';
import SandBox from './sandBox';
import createSandbox from './createSandbox';

export default function (fullFilePath: string, filePath: string): SandBox {
  let sandbox = cache.get(filePath);
  if (sandbox === null) {
    sandbox = createSandbox(fullFilePath, filePath);
  }
  return sandbox;
}
