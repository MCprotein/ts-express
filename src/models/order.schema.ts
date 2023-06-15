import { Schema } from 'mongoose'

export interface IOrder extends Document {
  id: string
  totalQty: Number
  orderItems: IOrderItem[]
  deletedAt: Date
}

export interface IOrderItem extends Document {
  id: string
  name: String
  company: String
  qty: Number
  deletedAt: Date
  orderId: String
}

export const OrderItemSchema = new Schema({
  name: String,
  company: String,
  qty: Number,
  deletedAt: Date,
  orderId: String
})

export const OrderSchema = new Schema(
  {
    totalQty: Number,
    orderItems: {
      type: [OrderItemSchema]
    },
    deletedAt: Date
  },
  { versionKey: false, collection: 'order' }
)
