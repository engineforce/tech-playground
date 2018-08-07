import { toUpper } from 'lodash';
import { toLower } from 'string-lib';

export async function getUsers() {
  const users = [
    { fruit: 'apple' },
    { fruit: 'banana' },
    { fruit: 'strawberry' },
    { fruit: 'banana' },
    { fruit: 'orange' },
  ];

  const enhancedUsers = users.map((obj) => {
    if (obj.fruit === 'apple') {
      return { ...obj, quantity: 20, label: toLower(toUpper('Hello World!')) };
    }

    return obj;
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  return enhancedUsers;
}
