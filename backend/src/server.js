import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { seedDatabase } from './seed.js'
import portfolioRoutes from './routes/portfolio.js'
import contactRoutes from './routes/contact.js'

const app = express()
const port = Number(process.env.PORT) || 5000

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean)

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error(`Origin ${origin} not allowed by CORS`))
    },
  })
)

app.use(express.json({ limit: '100kb' }))

await seedDatabase()

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'portofolio-aboy-backend',
    timestamp: new Date().toISOString(),
  })
})

app.use('/api', portfolioRoutes)
app.use('/api', contactRoutes)

app.use((_req, res) => {
  res.status(404).json({ error: 'Endpoint not found' })
})

app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`)
})
