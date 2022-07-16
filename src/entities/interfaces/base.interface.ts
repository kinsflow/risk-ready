interface Repo<T> {
    exists(t: T): Promise<boolean>;
    delete(t: T): Promise<any>;
    getById(id: string): Promise<T>;
    save(t: T): Promise<any>;
  }