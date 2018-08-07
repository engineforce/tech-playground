export async function asyncReduce<T, TResult>(
  collection: T[] | null | undefined,
  callback: (
    prev: TResult,
    curr: T,
    index: number,
    list: T[]
  ) => Promise<TResult>,
  accumulator: TResult
): Promise<TResult> {
  let result = accumulator;

  if (collection) {
    for (let i = 0; i < collection.length; ++i) {
      result = await callback(result, collection[i], i, collection);
    }
  }

  return result;
}
