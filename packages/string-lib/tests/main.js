import { map } from 'lodash';
import { toLower } from '../src/toLower';

export async function main() {
  const arr1 = [
    { fruit: 'apple' },
    { fruit: 'banana' },
    { fruit: 'strawberry' },
    { fruit: 'banana' },
    { fruit: 'orange' },
  ];

  const arr2 = map(arr1, (obj) => {
    if (obj.fruit === 'apple') {
      return { ...obj, quantity: 20, label: toLower('Hello World!') };
    }

    return obj;
  });

  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });

  console.log(arr2);

  return arr2;
}
