import { toLower } from '../src/toLower';

test('test1', () => {
  expect(toLower('Hello World!')).toBe('hello world!');
});
