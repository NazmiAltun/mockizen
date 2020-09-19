import vm from 'vm';
import fs from 'fs';

import SandBox from './sandBox';
import createSandbox from './createSandbox';

export default function (filePath: string, fullFilePath: string): SandBox {
  const sandbox = createSandbox(filePath);
  const code = fs.readFileSync(fullFilePath, 'utf8');
  vm.runInNewContext(code, sandbox);
  return sandbox;
}
