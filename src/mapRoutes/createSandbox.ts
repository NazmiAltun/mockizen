import path from 'path';

type Module = {
  exports: (req: any, res: any) => void;
};

type SandBox = NodeJS.Global & {
  module: Module;
};

/*eslint no-empty-function: ["error", { "allow": ["functions"] }]*/
export default function (filePath: string): SandBox {
  const fileDirname = path.parse(filePath).dir;
  const sandbox = Object.assign(global, {
    __dirname: fileDirname,
    module: {
      exports: function (): void {
        //
      },
    },
  });
  return sandbox;
}
