import { asyncMap } from '../src/asyncMap';

test('test 1', async () => {
  let inputs = ['a', 'b', 'c', 'd', 'e'];
  let outputs = await asyncMap(inputs, async (value, index) => {
    return `${index}.${value}`;
  });

  expect(outputs).toEqual(['0.a', '1.b', '2.c', '3.d', '4.e']);
});
