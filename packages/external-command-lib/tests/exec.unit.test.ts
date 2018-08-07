import { exec } from '..';

beforeEach(() => {
  const logger = require('loglevel');
  logger.disableAll();
});

test('echo hello world should pass', async () => {
  let result = await exec('echo hello world'.split(' '));
  expect(result).toContain('hello world');
});

test('ls nonExistingPath should fail', async () => {
  await expect(exec('ls nonExistingPath'.split(' '))).rejects.toMatch(
    /No such file or directory/
  );
});

test('bash ./ErrorWithoutStatusCode.sh show fail', async () => {
  let result = await exec(
    `bash ${__dirname}/ErrorWithoutStatusCode.sh`.split(' ')
  );
  expect(result).toContain('Error without status code');
});

test('bash ./ErrorWithStatusCode.sh should pass', async () => {
  await expect(
    exec(`bash ${__dirname}/ErrorWithStatusCode.sh`.split(' '))
  ).rejects.toMatch(/Error with status code/);
});
