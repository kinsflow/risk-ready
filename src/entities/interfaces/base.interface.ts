export interface Repo<Type> {
    exists(t: Type | string): Promise<boolean>;
    delete(t: Type | string): Promise<any>;
    getById(id: string): Promise<Type>;
    save(t: Type): Promise<any>;
  }