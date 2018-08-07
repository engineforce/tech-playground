///<reference=
import * as cp from 'child_process';
import { ITask, IRunOptions } from './IOptions';
import { takeRight } from 'lodash';
import { Task } from './Task';
import logger from 'loglevel';

export function exec(
  commandParts: string[],
  options: IRunOptions = {}
): Promise<string> {
  let command = commandParts.join(' ');

  logger.info(`Execute "${command}" "${options.workingDir}"`);

  const childProcess = cp.spawn(
    commandParts[0],
    takeRight(commandParts, commandParts.length - 1),
    {
      cwd: options.workingDir,
      env: process.env,
      shell: true,
      stdio: ['inherit', 'pipe', 'pipe'],
    }
  );

  let outputMessage = '';
  let errorMessage = '';
  return new Promise<string>((resolve, reject) => {
    let task = new Task(childProcess, options.timeout);

    task.on('outputChanged', (output) => {
      outputMessage += output.message;
      if (output.source == 'stderr') {
        errorMessage += output.message;
      }
    });

    task.on('completed', (info) => {
      if (info.code == 0) {
        logger.info(`Pass: ${command}\n ${outputMessage}`);
        resolve(outputMessage);
      } else {
        logger.error(`Error: ${command}\n${errorMessage}\n ${outputMessage}`);
        reject(errorMessage);
      }
    });
  });
}
