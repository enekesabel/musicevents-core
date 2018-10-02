export interface IApi<T> {
  get(id: string): Promise<T>;

  getAll(): Promise<T[]>;

  find(criteria: string): Promise<T[]>;

}
