export default function sortListOfObjects<T>(list: T[], property: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  return list.sort((objA, objB) => {
    const valueA = objA[property];
    const valueB = objB[property];

    if (valueA < valueB) return order === 'asc' ? -1 : 1;

    if (valueA > valueB) return order === 'asc' ? 1 : -1;

    return 0;
  })
}