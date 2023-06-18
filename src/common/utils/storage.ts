export interface Storage {
  get(key: string): string | null;

  set(key: string, value: string): void;

  remove(key: string): void;
}

class MemoStorage implements Storage {
  private storage = new Map<string, string>();

  public get(key: string) {
    return this.storage.get(key) || null;
  }

  public set(key: string, value: string) {
    this.storage.set(key, value);
  }

  public remove(key: string) {
    this.storage.delete(key);
  }
}

class LocalStorage implements Storage {
  public static canUse(): boolean {
    const TEST_KEY = generateTestKey();

    // NOTE: 사용자가 쿠키 차단을 하는 경우 or SSR환경에서는 localStorage 접근 시에 예외가 발생합니다.
    try {
      localStorage.setItem(TEST_KEY, "test");
      localStorage.removeItem(TEST_KEY);
      return true;
    } catch (err) {
      return false;
    }
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public remove(key: string) {
    localStorage.removeItem(key);
  }
}

function generateTestKey() {
  return new Array(4)
    .fill(null)
    .map(() => Math.random().toString(36).slice(2))
    .join("");
}

export function generateStorage(): Storage {
  if (LocalStorage.canUse()) {
    return new LocalStorage();
  }
  return new MemoStorage();
}

export const safeLocalStorage = generateStorage();
