type ArgType<T> = {
  [K in keyof T]: T[K];
};

export const fieldWithTextValid = <T>(arg: ArgType<T>): boolean =>
  Object.values(arg).includes("");
