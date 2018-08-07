import * as aws from 'aws-sdk';

export * from './src/mapAppSyncEvent';
export * from './src/handleLambdaFunction';
export * from './src/IEvent';
export * from './src/IEventHeader';

import { loadFindFunctions } from './src/findFunctions';

const lambda = new aws.Lambda();

export const findFunctions = loadFindFunctions({ lambda });
