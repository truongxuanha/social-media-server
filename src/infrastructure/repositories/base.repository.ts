import { CatchPrismaError } from "@/application/decorators/catch-prisma-error";
import { IBaseRepository } from "@/domain/repositories/base.repository";

export interface BaseEntity {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PrismaModel<TEntity> {
  updateMany(arg0: {
    where: Record<string, unknown>;
    data: { [x: string]: Date };
  }): unknown;
  deleteMany: (args: { where: Record<string, unknown> }) => Promise<unknown>;
  findMany: (args: Record<string, unknown>) => Promise<TEntity[]>;
  findUnique: (args: Record<string, unknown>) => Promise<TEntity | null>;
  delete: (args: Record<string, unknown>) => Promise<void>;
  create: (args: Record<string, unknown>) => Promise<TEntity>;
  update: (args: Record<string, unknown>) => Promise<TEntity>;
  findFirst: (args: Record<string, unknown>) => Promise<TEntity | null>;
  createMany: (args: Record<string, unknown>) => Promise<number>;
}

export abstract class BaseRepository<
  TEntity extends BaseEntity,
  TFilter = Record<string, unknown>,
> implements IBaseRepository<TEntity, TFilter>
{
  protected softDeleteFieldName: string = "deletedAt";
  constructor(
    protected model: PrismaModel<TEntity>,
    protected idFieldName: string
  ) {}
  protected buildWhereClause(filter?: TFilter): Record<string, unknown> {
    console.log("filter_01_01===", filter);
    const baseFilter: Record<string, unknown> = filter ? { ...filter } : {};
    console.log("filter_01_02===", baseFilter);
    return baseFilter;
  }

  protected baseBuildWhereClause(
    filter?: TFilter,
    isIgnoreSoftDelete?: boolean
  ): Record<string, unknown> {
    let baseFilter: Record<string, unknown> = filter ? { ...filter } : {};
    baseFilter = this.buildWhereClause(filter);
    if (!isIgnoreSoftDelete && this.isSoftDeleteEnabled()) {
      baseFilter[this.softDeleteFieldName] = null;
    }
    return baseFilter;
  }

  protected getIncludeOptions(): Record<string, unknown> {
    return {};
  }

  protected getIncludeOptionsFindById(): Record<string, unknown> {
    return {};
  }

  protected getIncludeOptionsCreate(): Record<string, unknown> {
    return {};
  }

  protected getIncludeOptionsUpdate(): Record<string, unknown> {
    return {};
  }

  protected isSoftDeleteEnabled(): boolean {
    return false;
  }

  protected getOrderByOptions(): Record<string, unknown> {
    return { createdAt: "desc" };
  }

  @CatchPrismaError
  async findAll(
    filter?: TFilter,
    isIgnoreSoftDelete?: boolean
  ): Promise<TEntity[]> {
    const whereClause = this.baseBuildWhereClause(filter, isIgnoreSoftDelete);
    const includeOptions = this.getIncludeOptions();

    const models = await this.model.findMany({
      where: whereClause,
      orderBy: this.getOrderByOptions(),
      ...includeOptions,
    });

    return models;
  }

  @CatchPrismaError
  async findById(id: string): Promise<TEntity | null> {
    const includeOptions = this.getIncludeOptionsFindById();

    const model = await this.model.findUnique({
      where: { [this.idFieldName]: id },
      ...includeOptions,
    });

    return model;
  }

  async findFirst(
    filter?: TFilter,
    isIgnoreSoftDelete?: boolean
  ): Promise<TEntity | null> {
    const whereClause = this.baseBuildWhereClause(filter, isIgnoreSoftDelete);
    const includeOptions = this.getIncludeOptions();

    const model = await this.model.findFirst({
      where: whereClause,
      orderBy: this.getOrderByOptions(),
      ...includeOptions,
    });

    return model;
  }

  @CatchPrismaError
  async delete(id: string): Promise<void> {
    if (this.isSoftDeleteEnabled()) {
      await this.model.update?.({
        where: {
          [this.idFieldName]: id,
        },
        data: {
          [this.softDeleteFieldName]: new Date(),
        },
      });
    } else {
      await this.model.delete({
        where: { [this.idFieldName]: id },
      });
    }
  }

  @CatchPrismaError
  async create(data: Record<string, unknown>): Promise<TEntity> {
    const includeOptions = this.getIncludeOptionsCreate();

    const model = await this.model.create({
      data,
      ...includeOptions,
    });

    return model;
  }

  @CatchPrismaError
  async update(id: string, data: Record<string, unknown>): Promise<TEntity> {
    const includeOptions = this.getIncludeOptionsUpdate();

    const model = await this.model.update({
      where: { [this.idFieldName]: id },
      data,
      ...includeOptions,
    });

    return model;
  }

  @CatchPrismaError
  async deleteMany(filter: unknown): Promise<void> {
    if (this.isSoftDeleteEnabled()) {
      await this.model.updateMany?.({
        where: filter as Record<string, unknown>,
        data: {
          [this.softDeleteFieldName]: new Date(),
        },
      });
    } else {
      await this.model.deleteMany({
        where: filter as Record<string, unknown>,
      });
    }
  }
}
