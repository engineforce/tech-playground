import filter from 'lodash/filter';
import { Lambda } from 'aws-sdk';

interface IFindFunctions {
  (functionName?: string): Promise<Lambda.FunctionConfiguration[]>;
}

interface ILoadFindFunctionsOptions {
  lambda: Lambda;
}

export function loadFindFunctions(
  options: ILoadFindFunctionsOptions
): IFindFunctions {
  return function findFunctions(functionName?: string) {
    return _findFunctions(options, functionName);
  };
}

async function _findFunctions(
  options: ILoadFindFunctionsOptions,
  functionName?: string,
  nextMarker?
) {
  let result = await options.lambda
    .listFunctions({
      Marker: nextMarker,
    })
    .promise();

  let functions = result.Functions;
  if (functionName) {
    functions = filter(functions, (func) => func.FunctionName == functionName);
  }

  if (result.NextMarker) {
    functions = [
      ...functions,
      ...(await _findFunctions(options, functionName, result.NextMarker)),
    ];
  }

  return functions;
}
