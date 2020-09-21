import vm from 'vm';
import SandBox from './sandBox';
import getSandbox from './getSandbox';
import getJsCode from './getJsCode';

export default async function (filePath: string, fullFilePath: string): Promise<SandBox> {
  const sandbox = getSandbox(fullFilePath, filePath);
  const code = await getJsCode(fullFilePath);
  vm.runInNewContext(code, sandbox);
  return sandbox;
}
