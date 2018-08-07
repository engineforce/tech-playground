import { run } from '..';

beforeEach(() => {
  const logger = require('loglevel');
  logger.disableAll();
});

test('bash ./LongRunningTask.sh with kill', async () => {
  return new Promise((resolve, reject) => {
    let expected = 0;
    let task = run(['bash', `${__dirname}/LongRunningTask.sh`, '10']);
    task.on('outputChanged', (output) => {
      let numberData = parseInt(output.message);
      expect(numberData).toEqual(expected++);
      if (numberData >= 2) {
        task.kill();
      }
    });

    task.on('completed', (code) => {
      expect(expected).toBe(3);
      resolve();
    });
  });
});

test('bash ./LongRunningTask.sh without kill', async () => {
  return new Promise((resolve, reject) => {
    let expected = 0;
    let task = run(['bash', `${__dirname}/LongRunningTask.sh`, '2']);
    task.on('outputChanged', (output) => {
      let numberData = parseInt(output.message);
      expect(numberData).toEqual(expected++);
    });
    task.on('completed', (code) => {
      expect(expected).toBe(2);
      resolve();
    });
  });
});
