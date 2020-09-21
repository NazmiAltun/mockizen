import path from 'path';
import SandBox from './sandBox';

export default function (fullFilePath: string, filePath: string): SandBox {
  const newRequire = (modPath: string) => {
    let newModPath = path.resolve(path.dirname(fullFilePath), modPath);
    return require(newModPath);
  };

  const sandbox = Object.assign(global, {
    __dirname: path.parse(filePath).dir,
    require: newRequire,
    module: {
      exports: function (): void {
        //
      },
    },
  });
  return sandbox;
}
