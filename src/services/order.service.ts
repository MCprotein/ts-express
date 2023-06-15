import { OrderItem } from '@prisma/client'
import { IRepository } from '../interfaces/database.interface'

export interface UpdateOrderItemDto {
  orderItemId: string
  qty: number
}

export class OrderService {
  constructor(private readonly orderRepository: IRepository) {
    this.orderRepository = orderRepository
  }

  async getOrder(id: string) {
    const order = await this.orderRepository.findOneById(id)
    if (order?._id) {
      const { _id, ...restOrder } = order
      return {
        id: _id,
        ...restOrder
      }
    }

    return order
  }

  async postOrder(totalQty: number, orderItems: OrderItem[]) {
    await this.orderRepository.createOne(totalQty, orderItems)
  }

  async patchOrder(id: string, totalQty: number, orderItems: UpdateOrderItemDto[]) {
    await this.orderRepository.updateOne(id, totalQty, orderItems[0])
  }

  async deleteOrder(id: string) {
    await this.orderRepository.deleteOne(id)
  }
}
