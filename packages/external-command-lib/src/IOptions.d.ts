export interface ITaskCompleteInfo {
  code: number;
  signal: string;
}

export interface ITask {
  kill(signal?: string): void;
  on?(event: 'outputChanged', listener: (arg: IOutput) => void);
  on?(event: 'completed', listener: (arg: ITaskCompleteInfo) => void);
}

export interface IOutput {
  source: 'stdout' | 'stderr';
  message: string;
}

export interface IRunOptions {
  workingDir?: string;
  timeout?: number;
}

export interface IExternalCommandRunner {
  exec(commandParts: string[], options: IRunOptions): Promise<string>;
  run(commandParts: string[], options?: IRunOptions): ITask;
}
