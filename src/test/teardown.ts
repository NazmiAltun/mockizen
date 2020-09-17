import { createHttpTerminator } from 'http-terminator';
import server from '..';

after(async () => {
  const httpTerminator = createHttpTerminator({ server });
  await httpTerminator.terminate();
});
