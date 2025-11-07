export interface IBaseRepository<TEntity, TFilter = Record<string, unknown>> {
  findAll(filter?: TFilter, isIgnoreSoftDelete?: boolean): Promise<TEntity[]>;
  findById(id: string, isIgnoreSoftDelete?: boolean): Promise<TEntity | null>;
  create(input: Record<string, unknown>): Promise<TEntity>;
  update(id: string, input: Record<string, unknown>): Promise<TEntity>;
  delete(id: string): Promise<void>;
  deleteMany(filter: unknown): Promise<void>;
  findFirst(
    filter?: TFilter,
    isIgnoreSoftDelete?: boolean
  ): Promise<TEntity | null>;
}
