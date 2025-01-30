export const flattenArray = <T>(arr: T[][]) =>
  arr.reduce((acc, curr) => [...acc, ...curr], []);
