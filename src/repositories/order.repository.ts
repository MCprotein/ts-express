import { Order, OrderItem, PrismaClient, Prisma } from '@prisma/client'
import { UpdateOrderItemDto } from '../services/order.service'
import { OrderDto } from '../dto/order.dto'
import { OrderItemDto } from '../dto/orderItem.dto'
import { IRepository } from '../interfaces/database.interface'

export class OrderRepository implements IRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findOneById(id: string): Promise<OrderDto | null> {
    return await this.prismaClient.order.findUnique({ where: { id } })
  }

  // async findManyByProductName(productName: string): Promise<
  //   (OrderDto & {
  //     orderItems: OrderItemDto[]
  //   })[]
  // > {
  //   return await this.prismaClient.order.findMany({
  //     include: {
  //       orderItems: {
  //         where: {
  //           name: productName
  //         }
  //       }
  //     }
  //   })
  // }

  async createOne(totalQty: number, orderItems?: OrderItemDto[]): Promise<void> {
    await this.prismaClient.order.create({
      data: { totalQty, orderItems: { create: orderItems } }
    })
  }

  async updateOne(id: string, totalQty: number, orderItems: UpdateOrderItemDto) {
    await this.prismaClient.order.update({
      where: { id },
      data: {
        totalQty,
        orderItems: {
          update: {
            where: { id: orderItems.orderItemId },
            data: { qty: orderItems.qty }
          }
        }
      }
    })
  }

  async deleteOne(id: string) {
    await this.prismaClient.order.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        orderItems: {
          updateMany: {
            where: {},
            data: {
              deletedAt: new Date()
            }
          }
        }
      }
    })
  }
}
