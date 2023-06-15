import express, { Express, Router } from 'express'
import dotenv from 'dotenv'
import { OrderController } from './controllers/order.controller'
import { OrderService } from './services/order.service'
import { OrderRepository } from './repositories/order.repository'
import { PrismaClient } from '@prisma/client'
import { errorHandler } from './error-handler'
import mongoose from 'mongoose'
import { OrderModel } from './models/order.model'
import { IOrder, OrderSchema } from './models/order.schema'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())

if (!process.env.MONGODB_URL) {
  throw new Error('MONGODB_URL is not defined')
}

const mongodbConnection = mongoose.createConnection(process.env.MONGODB_URL)
const orderModel = new OrderModel<IOrder>(mongodbConnection, OrderSchema)

const prismaClient = new PrismaClient()
const orderRepository = new OrderRepository(prismaClient)
const orderService = new OrderService(orderModel)
const orderController = new OrderController(orderService)

const router = Router()
router.use('/orders', orderController.router)

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
