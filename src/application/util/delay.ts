export const delay = (duration: number) => new Promise((r) => setTimeout(r, duration));

export const withDelay =
  <T extends (...args: any[]) => unknown>(cb: T, time: number) =>
  (...args: Parameters<T>) =>
    delay(time).then(() => cb(...args) as ReturnType<T>);
