export class OrderItemDto {
  id: string
  name: string
  company: string
  qty: number
  deletedAt: Date | null
  orderId: string
}
