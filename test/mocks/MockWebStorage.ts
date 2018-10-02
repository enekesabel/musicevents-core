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

export const fillMockStorage = (storage: Storage, data: { id: string }[]) => {
  data.forEach(item => storage.setItem(item.id, JSON.stringify(item)));
};
