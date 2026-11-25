import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendRoot = path.resolve(__dirname, '..')

const isServerless = Boolean(
  process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME
)

function resolveDbPath() {
  if (process.env.DB_PATH) {
    return path.isAbsolute(process.env.DB_PATH)
      ? process.env.DB_PATH
      : path.resolve(backendRoot, process.env.DB_PATH)
  }
  if (isServerless) {
    return '/tmp/portfolio.db'
  }
  return path.resolve(backendRoot, './data/portfolio.db')
}

let dbInstance = null
let sqliteUnavailable = false

export async function getDb() {
  if (dbInstance) return dbInstance
  if (sqliteUnavailable) return null

  try {
    const { DatabaseSync } = await import('node:sqlite')
    const dbFilePath = resolveDbPath()
    fs.mkdirSync(path.dirname(dbFilePath), { recursive: true })
    dbInstance = new DatabaseSync(dbFilePath)
    return dbInstance
  } catch (err) {
    console.warn('node:sqlite unavailable, falling back to in-memory seed data:', err.message)
    sqliteUnavailable = true
    return null
  }
}

export async function initSchema() {
  const db = await getDb()
  if (!db) return null

  db.exec(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      name TEXT NOT NULL,
      role_id TEXT NOT NULL,
      role_en TEXT NOT NULL,
      school TEXT NOT NULL,
      major_id TEXT NOT NULL,
      major_en TEXT NOT NULL,
      grade_id TEXT NOT NULL,
      grade_en TEXT NOT NULL,
      bio_id_json TEXT NOT NULL,
      bio_en_json TEXT NOT NULL,
      email TEXT NOT NULL,
      whatsapp TEXT NOT NULL,
      location TEXT NOT NULL,
      github TEXT NOT NULL,
      linkedin TEXT NOT NULL,
      stats_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      period_id TEXT NOT NULL,
      period_en TEXT NOT NULL,
      role_id TEXT NOT NULL,
      role_en TEXT NOT NULL,
      place_id TEXT NOT NULL,
      place_en TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      title_id TEXT NOT NULL,
      title_en TEXT NOT NULL,
      desc_id TEXT NOT NULL,
      desc_en TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT '',
      tags_json TEXT NOT NULL,
      category_json TEXT NOT NULL,
      github TEXT NOT NULL DEFAULT '',
      live TEXT NOT NULL DEFAULT '',
      featured INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS skill_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      category_id TEXT NOT NULL,
      category_en TEXT NOT NULL,
      items_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      title_id TEXT NOT NULL,
      title_en TEXT NOT NULL,
      year TEXT NOT NULL,
      issuer_id TEXT NOT NULL,
      issuer_en TEXT NOT NULL,
      pdf TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT ''
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      lang TEXT NOT NULL DEFAULT 'id',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `)

  return db
}
