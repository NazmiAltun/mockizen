import path from 'path';
import SandBox from './sandBox';

export default function (filePath: string): SandBox {
  const fileDirname = path.parse(filePath).dir;
  const sandbox = Object.assign(global, {
    __dirname: fileDirname,
    require: require,
    module: {
      exports: function (): void {
        //
      },
    },
  });
  return sandbox;
}
