export interface IWebStorage {
  readonly length: number;

  clear(): void;

  getItem(key: string): string;

  key(n: number): string;

  removeItem(key: string): void;

  setItem(key: string, value: string): void;
}
