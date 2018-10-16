class DummyWebStorage implements Storage {

  private store: { [key: string]: string } = {};

  setItem(key: string, value: string): void {
    this.store[key] = value;
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  key(n: number): string {
    return Object.keys(this.store)[n];
  }

  getItem(key: string): string {
    return this.store[key];
  }

  clear(): void {
    this.store = {};
  }

  get length(): number {
    return Object.keys(this.store).length;
  }
}

export const createNewMockStorage: () => Storage = () => {
  return new DummyWebStorage();
};

export const getAllEntry: (storage: Storage) => any[] = (storage: Storage) => {
  const options = [];
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    const value = storage.getItem(key);
    options.push(JSON.parse(value));
  }
  return options;
};

export const fillMockStorage = (storage: Storage, entries: { key: string, value: any }[]) => {
  entries.forEach(entry => storage.setItem(entry.key, JSON.stringify(entry.value)));
};

export const getParsedItem = (storage: Storage, key: string) => {
  return JSON.parse(storage.getItem(key));
};
