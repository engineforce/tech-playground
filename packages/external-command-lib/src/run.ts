///<reference=
import * as cp from 'child_process';
import { ITask, IRunOptions } from './IOptions';
import { Task } from './Task';
import logger from 'loglevel';

export function run(commandParts: string[], options: IRunOptions = {}): ITask {
  logger.info(`Execute ${commandParts.join(' ')} ${options.workingDir}`);

  const childProcess = cp.exec(commandParts.join(' '), {
    cwd: options.workingDir,
  });

  // const childProcess = cp.spawn(
  //     commandParts[0],
  //     _.takeRight(commandParts, commandParts.length - 1),
  //     {
  //         cwd: workingDir,
  //         env: process.env,
  //         shell: true
  //     }
  // );

  return new Task(childProcess, options.timeout);
}
