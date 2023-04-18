import type { SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

type Serializable<T> = T extends string | number | boolean | unknown[] | Record<string, unknown>
  ? T
  : never;

interface StorageStateOptions<T> {
  defaultValue?: Serializable<T>;
}
interface StorageStateOptionsWithDefaultValue<T> extends StorageStateOptions<T> {
  defaultValue: Serializable<T>;
}

export function useSessionStorage<T>(
  key: string,
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
];
export function useSessionStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptionsWithDefaultValue<T>,
): readonly [Serializable<T>, (value: SetStateAction<Serializable<T>>) => void];
export function useSessionStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptions<T>,
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
];
export function useSessionStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptions<T> = {},
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
] {
  const get = useCallback(<T>() => {
    if (typeof window === "undefined") return defaultValue;
    const item = sessionStorage.getItem(key);

    if (item == null) {
      return defaultValue;
    }

    try {
      const result = JSON.parse(item);

      if (result == null) {
        return defaultValue;
      }

      return result as T;
    } catch {
      // NOTE: JSON 객체가 아닌 경우
      return defaultValue;
    }
  }, [defaultValue, key]);

  const [state, setState] = useState<Serializable<T> | undefined>(defaultValue);

  useEffect(() => {
    setState(get());
  }, [get]);

  const set = useCallback(
    (value: SetStateAction<Serializable<T> | undefined>) => {
      setState((curr) => {
        const nextValue = typeof value === "function" ? value(curr) : value;

        if (nextValue == null) {
          window?.sessionStorage.removeItem(key);
        } else {
          window?.sessionStorage.setItem(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  return [state, set];
}
