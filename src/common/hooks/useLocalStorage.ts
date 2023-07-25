import type { SetStateAction } from "react";
import { useCallback, useEffect, useState } from "react";

import { safeLocalStorage } from "@/common/utils";

type Serializable<T> = T extends string | number | boolean | unknown[] | Record<string, unknown>
  ? T
  : never;

interface StorageStateOptions<T> {
  defaultValue?: Serializable<T>;
}
interface StorageStateOptionsWithDefaultValue<T> extends StorageStateOptions<T> {
  defaultValue: Serializable<T>;
}

export function useLocalStorage<T>(
  key: string,
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
];
export function useLocalStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptionsWithDefaultValue<T>,
): readonly [Serializable<T>, (value: SetStateAction<Serializable<T>>) => void];
export function useLocalStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptions<T>,
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
];
export function useLocalStorage<T>(
  key: string,
  { defaultValue }: StorageStateOptions<T> = {},
): readonly [
  Serializable<T> | undefined,
  (value: SetStateAction<Serializable<T> | undefined>) => void,
] {
  const getValue = useCallback(<T>() => {
    const item = safeLocalStorage.get(key);

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

  /**
   * NOTE: hydration error 때문에 useState의 초기값으로 defaultValue을 넣어줌
   * @see https://nextjs.org/docs/messages/react-hydration-error
   */
  const [state, setState] = useState<Serializable<T> | undefined>(defaultValue);

  useEffect(() => {
    setState(getValue());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const set = useCallback(
    (value: SetStateAction<Serializable<T> | undefined>) => {
      setState((curr) => {
        const nextValue = typeof value === "function" ? value(curr) : value;

        if (nextValue == null) {
          safeLocalStorage.remove(key);
        } else {
          safeLocalStorage.set(key, JSON.stringify(nextValue));
        }

        return nextValue;
      });
    },
    [key],
  );

  return [state, set];
}
