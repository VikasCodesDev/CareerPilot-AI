import { Model, Document, UpdateQuery } from "mongoose";
import type { IBaseRepository, FilterQuery, PaginationOptions, PaginatedResult } from "./base.repository";

export class MongooseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).lean().exec() as Promise<T | null>;
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).lean().exec() as Promise<T | null>;
  }

  async findMany(filter: FilterQuery<T> = {}): Promise<T[]> {
    return this.model.find(filter).lean().exec() as Promise<T[]>;
  }

  async findPaginated(
    filter: FilterQuery<T>,
    options: PaginationOptions
  ): Promise<PaginatedResult<T>> {
    const { page, limit } = options;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.model.find(filter).skip(skip).limit(limit).lean().exec(),
      this.model.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: data as T[],
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = new this.model(data);
    return doc.save() as Promise<T>;
  }

  async updateById(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .lean()
      .exec() as Promise<T | null>;
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
