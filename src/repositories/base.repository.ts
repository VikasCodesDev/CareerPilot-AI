import type { Document, UpdateQuery } from "mongoose";

export type FilterQuery<T> = Partial<T> & Record<string, unknown>;

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IBaseRepository<T extends Document> {
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  findMany(filter?: FilterQuery<T>): Promise<T[]>;
  findPaginated(
    filter: FilterQuery<T>,
    options: PaginationOptions
  ): Promise<PaginatedResult<T>>;
  create(data: Partial<T>): Promise<T>;
  updateById(id: string, data: UpdateQuery<T>): Promise<T | null>;
  deleteById(id: string): Promise<boolean>;
  count(filter?: FilterQuery<T>): Promise<number>;
}
