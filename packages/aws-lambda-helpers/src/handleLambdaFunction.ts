import { IEvent } from './IEvent';
import { deepFreeze } from 'immutable-assign';

export function handleLambdaFunction(
  handler: (input) => Promise<any>,
  eventMapper?: ((event) => any)
) {
  return function handle(
    event: IEvent,
    context,
    callback: (error, data) => void
  ) {
    const unhandledRejection = async (ex) => {
      console.warn('unhandledRejection: ' + ex, ex);
      await fail(ex, callback, unhandledRejection, uncaughtException);
    };
    process.on('unhandledRejection', unhandledRejection);

    const uncaughtException = async (ex) => {
      console.warn('uncaughtException: ' + ex, ex);
      await fail(ex, callback, unhandledRejection, uncaughtException);
    };
    process.on('uncaughtException', uncaughtException);

    try {
      console.log(
        'Inputs:',
        JSON.stringify(event, undefined, 2),
        JSON.stringify(context, undefined, 2)
      );

      event = deepFreeze(event);
      if (eventMapper) {
        event = eventMapper(event);
      }

      console.log('Mapped Inputs', JSON.stringify(event, undefined, 2));

      let promise = Promise.resolve();

      promise = promise.then(() => {
        return handler(event);
      });

      promise.then(
        (data) => {
          pass(data, callback, unhandledRejection, uncaughtException);
        },
        (ex) => {
          fail(ex, callback, unhandledRejection, uncaughtException);
        }
      );
    } catch (ex) {
      fail(ex, callback, unhandledRejection, uncaughtException);
    }
  };
}

function pass(data, callback, unhandledRejection, uncaughtException) {
  cleanup(unhandledRejection, uncaughtException);
  console.log('Pass:', data);
  callback(undefined, data);
}

function fail(ex, callback, unhandledRejection, uncaughtException) {
  cleanup(unhandledRejection, uncaughtException);
  console.error('Error:', ex);
  callback(ex, 'Error');
}

function cleanup(unhandledRejection, uncaughtException) {
  if (unhandledRejection) {
    process.removeListener('unhandledRejection', unhandledRejection);
  }

  if (uncaughtException) {
    process.removeListener('uncaughtException', uncaughtException);
  }
}
