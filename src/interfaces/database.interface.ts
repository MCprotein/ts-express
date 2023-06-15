import { OrderDto } from '../dto/order.dto'
import { OrderItemDto } from '../dto/orderItem.dto'
import { UpdateOrderItemDto } from '../services/order.service'

export interface IRepository {
  findOneById(id: string): Promise<OrderDto | null>
  createOne(totalQty: number, orderItems?: OrderItemDto[]): Promise<void>
  updateOne(id: string, totalQty: number, orderItems: UpdateOrderItemDto): Promise<void>
  deleteOne(id: string): Promise<void>
}
