export * from "./common";
export * from "./entities";

export const sharedFunc = (a: number | string, b: number | string): number =>
  Number(a) + Number(b);
