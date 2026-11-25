import { Router } from 'express'
import { saveContactMessage } from '../services/portfolioService.js'

const router = Router()

router.post('/contact', async (req, res, next) => {
  try {
    const result = await saveContactMessage(req.body ?? {})
    return res.status(result.status).json(result.body)
  } catch (err) {
    return next(err)
  }
})

export default router
