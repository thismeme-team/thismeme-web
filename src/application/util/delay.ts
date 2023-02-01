import { delay } from "./time";

export const withDelay =
  <T extends (...args: unknown[]) => unknown>(cb: T, time: number) =>
  (...args: Parameters<T>) =>
    delay(time).then(() => cb(...args) as ReturnType<T>);
