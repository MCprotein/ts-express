import mongoose, { Connection, Model, Schema, Types } from 'mongoose'
import { IRepository } from '../interfaces/database.interface'
import { OrderDto } from '../dto/order.dto'
import { OrderItemDto } from '../dto/orderItem.dto'
import { UpdateOrderItemDto } from '../services/order.service'

export class OrderModel<T extends Document> implements IRepository {
  private orderModel: Model<T>
  constructor(mongodbConnection: Connection, orderSchema: Schema<T>) {
    this.orderModel = mongodbConnection.model<T & Document>('order', orderSchema)
  }

  async findOneById(id: string): Promise<OrderDto | null> {
    return await this.orderModel
      .findOne({ _id: new Types.ObjectId(id) }, { totalQty: 1, id: 1, deletedAt: 1 })
      .lean()
  }

  async createOne(totalQty: number, orderItems?: OrderItemDto[]): Promise<void> {
    await this.orderModel.create({ totalQty, orderItems })
  }

  async updateOne(id: string, totalQty: number, orderItems: UpdateOrderItemDto): Promise<void> {
    const exist_order = await this.orderModel.findOne({ _id: new Types.ObjectId(id) }).lean()

    await this.orderModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          totalQty,
          orderItems: {
            qty: orderItems.qty
          }
        }
      }
    )
  }
  async deleteOne(id: string): Promise<void> {
    await this.orderModel.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        $set: {
          deletedAt: new Date()
        }
      }
    )
  }
}
