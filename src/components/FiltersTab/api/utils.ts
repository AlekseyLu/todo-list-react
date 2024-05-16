export const sumActive = <T, K extends keyof T>(
  arr: T[],
  arg: K,
  flag: boolean
): number => arr.reduce((acc, item) => (item[arg] === flag ? acc + 1 : acc), 0);
