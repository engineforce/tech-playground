export function getLogs() {
  const logs = [];
  const logger = require('loglevel');
  logger.enableAll();
  const originalMethodFactory = logger.methodFactory;
  logger.methodFactory = (methodName, logLevel, loggerName) => {
    /* const rawMethod = */ originalMethodFactory(
      methodName,
      logLevel,
      loggerName
    );

    return function log(message) {
      // console.log(message);
      logs.push(message);
    };
  };
  logger.enableAll(); // Be sure to call setLevel method in order to apply plugin
  return logs;
}
