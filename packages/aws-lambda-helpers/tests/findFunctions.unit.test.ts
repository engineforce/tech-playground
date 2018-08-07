import { Lambda } from 'aws-sdk';
import _ from 'lodash';
import { loadFindFunctions } from '../src/findFunctions';

test('find all functions', async () => {
  let listFunctionsMock = jest.fn();

  let findFunctions = loadFindFunctions({
    lambda: <Lambda>(<any>{
      listFunctions: listFunctionsMock,
    }),
  });

  let allFunctions: Lambda.FunctionConfiguration[] = [
    { FunctionName: 'test1' },
    { FunctionName: 'test2' },
  ];
  listFunctionsMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<Lambda.ListFunctionsResponse>({
          Functions: allFunctions,
        });
      },
    };
  });

  let functions = await findFunctions();

  expect(listFunctionsMock).toHaveBeenCalledTimes(1);
  expect(functions).toEqual(allFunctions);
});

test('find some functions', async () => {
  let listFunctionsMock = jest.fn();

  let findFunctions = loadFindFunctions({
    lambda: <Lambda>(<any>{
      listFunctions: listFunctionsMock,
    }),
  });

  let allFunctions: Lambda.FunctionConfiguration[] = [
    { FunctionName: 'test1' },
    { FunctionName: 'test2' },
    { FunctionName: 'test3' },
    { FunctionName: 'test5' },
  ];
  listFunctionsMock.mockImplementationOnce((options) => {
    return {
      promise: () => {
        return Promise.resolve<Lambda.ListFunctionsResponse>({
          Functions: allFunctions,
        });
      },
    };
  });

  let functionName = 'test3';
  let functions = await findFunctions(functionName);

  expect(listFunctionsMock).toHaveBeenCalledTimes(1);
  expect(functions).toEqual(
    _.filter(allFunctions, (func) => func.FunctionName == functionName)
  );
});

test('find all functions with next token 1', async () => {
  await testPaging(1);
});

test('find all functions with next token 2', async () => {
  await testPaging(2);
});

test('find all functions with next token 3', async () => {
  await testPaging(3);
});

test('find all functions with next token 4', async () => {
  await testPaging(4);
});

test('find all functions with next token 5', async () => {
  await testPaging(5);
});

test('find all functions with next token 6', async () => {
  await testPaging(6);
});

test('find all functions with next token 7', async () => {
  await testPaging(7);
});

async function testPaging(functionsCount: number) {
  let listFunctionsMock = jest.fn();

  let findFunctions = loadFindFunctions({
    lambda: <Lambda>(<any>{
      listFunctions: listFunctionsMock,
    }),
  });

  let allFunctions: Lambda.FunctionConfiguration[] = _.take(
    [
      { FunctionName: 'test1', functionId: 'test1_id' },
      { FunctionName: 'test2', functionId: 'test2_id' },
      { FunctionName: 'test3', functionId: 'test3_id' },
      { FunctionName: 'test5', functionId: 'test5_id' },
      { FunctionName: 'test6', functionId: 'test6_id' },
      { FunctionName: 'test7', functionId: 'test7_id' },
    ],
    functionsCount
  );

  let pageSize = 3;

  listFunctionsMock.mockImplementation(
    (options: Lambda.ListFunctionsRequest) => {
      let startIndex = options.Marker ? parseInt(options.Marker) : 0;
      let endIndex = startIndex + pageSize;
      let nextMarker = endIndex < allFunctions.length ? endIndex : undefined;

      return {
        promise: () => {
          return Promise.resolve<Lambda.ListFunctionsResponse>({
            Functions: allFunctions.slice(startIndex, endIndex),
            NextMarker: nextMarker ? nextMarker.toString() : undefined,
          });
        },
      };
    }
  );

  let functions = await findFunctions();

  expect(listFunctionsMock).toHaveBeenCalledTimes(
    Math.ceil(allFunctions.length / pageSize)
  );
  expect(functions).toEqual(allFunctions);
}
