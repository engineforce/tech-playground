import { getUsers } from '../src/getUsers';

test('test1', async () => {
  const users = await getUsers();
  expect(users).toEqual([
    { fruit: 'apple', quantity: 20, label: 'hello world!' },
    { fruit: 'banana' },
    { fruit: 'strawberry' },
    { fruit: 'banana' },
    { fruit: 'orange' },
  ]);
});
