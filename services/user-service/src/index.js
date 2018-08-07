import { handleLambdaFunction } from 'aws-lambda-helpers';

import { getUsers as _getUsers } from './getUsers';

export const getUsers = handleLambdaFunction(_getUsers);
