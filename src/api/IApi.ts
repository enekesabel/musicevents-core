export interface IApi<T, C> {
  get(id: string): Promise<T>;

  getAll(): Promise<T[]>;

  find(criteria: C): Promise<T[]>;

}
