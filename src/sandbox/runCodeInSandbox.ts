import vm from 'vm';
import fs from 'fs';
import cache from 'memory-cache';
import SandBox from './sandBox';
import createSandbox from './createSandbox';

function getSandbox(filePath: string): SandBox {
  let sandbox = cache.get(filePath);
  if (sandbox === null) {
    sandbox = createSandbox(filePath);
  }
  return sandbox;
}

async function getCode(fullFilePath: string): Promise<string> {
  let code = cache.get(fullFilePath);
  if (code === null) {
    code = await fs.promises.readFile(fullFilePath, 'utf8');
  }
  return code;
}

export default async function (filePath: string, fullFilePath: string): Promise<SandBox> {
  const sandbox = getSandbox(filePath);
  const code = await getCode(fullFilePath);
  vm.runInNewContext(code, sandbox);
  return sandbox;
}
