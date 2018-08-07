import { getLogs } from './getLogs';

afterEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

test(
  'test get users',
  async () => {
    const logs = getLogs();
    const { exec } = require('external-command-lib');
    await exec(['sls', 'invoke', 'local', '-f', 'getUsers']);
    const logsText = JSON.stringify(logs);
    expect(logsText).toMatch('hello world!');
    expect(logsText).not.toMatch(/error/i);
  },
  60000
);
