import { Pool, PoolConfig } from 'pg'
import { logger } from '../utils/logger'

const dbConfig: PoolConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'cyber_portfolio',
  password: process.env.DB_PASSWORD || '12345',
  port: parseInt(process.env.DB_PORT || '5432'),
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
}

export const pool = new Pool(dbConfig)

// Test the connection
pool.on('connect', () => {
  logger.info('Connected to PostgreSQL database')
})

pool.on('error', (err) => {
  logger.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// Graceful shutdown
process.on('SIGINT', async () => {
  await pool.end()
  logger.info('Database pool has ended')
  process.exit(0)
})

export default pool 