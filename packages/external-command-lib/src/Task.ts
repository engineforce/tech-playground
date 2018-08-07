import { ITaskCompleteInfo, ITask, IOutput } from './IOptions';
import treeKill from 'tree-kill';
import cp from 'child_process';
import EventEmitter from 'events';
import logger from 'loglevel';

export class Task implements ITask {
  private _eventEmitter = new EventEmitter();

  constructor(private _childProcess: cp.ChildProcess, timeout: number) {
    let killTimer: any;
    if (timeout > 0) {
      killTimer = setTimeout(() => {
        this.kill();
      }, timeout);
    }

    _childProcess.stdout.on('data', (data) => {
      this._eventEmitter.emit('outputChanged', {
        source: 'stdout',
        message: data.toString(),
      });
    });
    _childProcess.stderr.on('data', (data) => {
      this._eventEmitter.emit('outputChanged', {
        source: 'stderr',
        message: data.toString(),
      });
    });
    _childProcess.on('exit', (code, signal) => {
      // Must clearTimeout here, or the process will not be stopped until the
      // timer is triggered.
      clearTimeout(killTimer);
      killTimer = undefined;

      // Make sure the all outputs are captured before complete.
      setTimeout(() => {
        this._eventEmitter.emit('completed', {
          code,
          signal,
        });
      }, 0);
    });
  }

  on(event, listener) {
    this._eventEmitter.on(event, listener);
  }

  kill(signal?: string) {
    setTimeout(() => {
      logger.info(`Kill ${this._childProcess.pid} with ${signal} signal.`);

      treeKill(this._childProcess.pid, signal);

      // Non of following works, because they don't kill the process tree.
      //cp.spawn("kill", [this._childProcess.pid.toString()]);
      //process.kill(this._childProcess.pid, signal);
      //this._childProcess.kill(signal);
    }, 0);
  }
}
