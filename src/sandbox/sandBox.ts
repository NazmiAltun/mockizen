import Module from './module';

type SandBox = NodeJS.Global & {
  module: Module;
};

export default SandBox;
