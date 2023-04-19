export const throttle = <T extends (...args: any[]) => void>(cb: T, delay = 300): T => {
  let timeout: NodeJS.Timeout | null;
  return ((...args: any[]) => {
    if (timeout) return;

    timeout = setTimeout(() => {
      timeout = null;
      return cb(...args);
    }, delay);
  }) as T;
};
