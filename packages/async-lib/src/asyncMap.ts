export async function asyncMap<TI, TO>(
  collection: TI[],
  iteratee?: (value: TI, index: number, collection: TI[]) => Promise<TO>
): Promise<TO[]> {
  let outCollection: TO[] = <any>collection.slice();

  for (let i = 0; i < collection.length; ++i) {
    outCollection[i] = await iteratee(collection[i], i, collection);
  }

  return outCollection;
}
