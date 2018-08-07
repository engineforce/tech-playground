import { curry } from 'ramda';
import { asyncMap } from './asyncMap';

async function _asyncMapFb<T>(
  iteratee: (value: T, index: number, collection: T[]) => Promise<any>,
  collection: T[]
): Promise<T[]> {
  return asyncMap(collection, iteratee);
}

export const asyncMapFb = curry(_asyncMapFb);
