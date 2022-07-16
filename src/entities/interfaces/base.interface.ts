export interface Repo<Type> {
    exists(t: Type): Promise<boolean>;
    delete(t: Type): Promise<any>;
    getById(id: string): Promise<Type>;
    save(t: Type): Promise<any>;
  }