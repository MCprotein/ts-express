import { NextFunction, Request, Response, Router } from 'express'
import { OrderService } from '../services/order.service'

export class OrderController {
  router: Router
  test: number
  constructor(private readonly orderService: OrderService) {
    this.orderService = orderService
    this.test = 0
    this.router = Router()
    this.router.get('/test', (req, res) => {
      console.log(this.test)
      this.test++
      res.send({ result: this.test })
    })
    this.router.get('/:id', this.getOrder)
    this.router.post('/', this.postOrder)
    this.router.patch('/:id', this.patchOrder)
    this.router.delete('/:id', this.deleteOrder)
  }

  getOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      if (!id) {
        return next()
      }

      const result = await this.orderService.getOrder(id)
      res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }
  postOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { totalQty, orderItems } = req.body
      await this.orderService.postOrder(totalQty, orderItems)

      res.status(201).json({ result: 'success' })
    } catch (error) {
      next(error)
    }
  }
  patchOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const { totalQty, orderItems } = req.body
      await this.orderService.patchOrder(id, totalQty, orderItems)
      res.status(200).json({ result: 'success' })
    } catch (error) {
      next(error)
    }
  }
  deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params

      await this.orderService.deleteOrder(id)
      res.status(200).json({ result: 'success' })
    } catch (error) {
      next()
    }
  }
}
