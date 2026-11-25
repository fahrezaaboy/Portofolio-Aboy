import { getDb } from '../db.js'
import { seedData, seedDatabase } from '../seed.js'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function resolveLang(rawLang) {
  return rawLang === 'en' ? 'en' : 'id'
}

let seededPromise = null
async function ensureSeededDb() {
  if (!seededPromise) {
    seededPromise = seedDatabase().catch(() => false)
  }
  await seededPromise
  return getDb()
}

export async function getProfile(rawLang) {
  const lang = resolveLang(rawLang)
  const db = await ensureSeededDb()

  if (!db) {
    const p = seedData.profile
    return {
      name: p.name,
      role: lang === 'en' ? p.role_en : p.role_id,
      school: p.school,
      major: lang === 'en' ? p.major_en : p.major_id,
      grade: lang === 'en' ? p.grade_en : p.grade_id,
      bio: lang === 'en' ? p.bio_en : p.bio_id,
      email: p.email,
      whatsapp: p.whatsapp,
      location: p.location,
      github: p.github,
      linkedin: p.linkedin,
      stats: p.stats.map((item) => ({
        value: item.value,
        label: lang === 'en' ? item.label_en : item.label_id,
      })),
    }
  }

  const row = db.prepare('SELECT * FROM profile WHERE id = 1').get()
  if (!row) return null

  return {
    name: row.name,
    role: lang === 'en' ? row.role_en : row.role_id,
    school: row.school,
    major: lang === 'en' ? row.major_en : row.major_id,
    grade: lang === 'en' ? row.grade_en : row.grade_id,
    bio: JSON.parse(lang === 'en' ? row.bio_en_json : row.bio_id_json),
    email: row.email,
    whatsapp: row.whatsapp,
    location: row.location,
    github: row.github,
    linkedin: row.linkedin,
    stats: JSON.parse(row.stats_json).map((item) => ({
      value: item.value,
      label: lang === 'en' ? item.label_en : item.label_id,
    })),
  }
}

export async function getExperiences(rawLang) {
  const lang = resolveLang(rawLang)
  const db = await ensureSeededDb()

  if (!db) {
    return seedData.experiences.map((exp, idx) => ({
      id: idx + 1,
      period: lang === 'en' ? exp.period_en : exp.period_id,
      role: lang === 'en' ? exp.role_en : exp.role_id,
      place: lang === 'en' ? exp.place_en : exp.place_id,
    }))
  }

  const rows = db.prepare('SELECT * FROM experiences ORDER BY sort_order ASC, id ASC').all()
  return rows.map((row) => ({
    id: row.id,
    period: lang === 'en' ? row.period_en : row.period_id,
    role: lang === 'en' ? row.role_en : row.role_id,
    place: lang === 'en' ? row.place_en : row.place_id,
  }))
}

export async function getProjects(rawLang, category = 'all') {
  const lang = resolveLang(rawLang)
  const db = await ensureSeededDb()

  const mapped = db
    ? db
        .prepare('SELECT * FROM projects ORDER BY sort_order ASC, id ASC')
        .all()
        .map((row) => ({
          id: row.id,
          title: lang === 'en' ? row.title_en : row.title_id,
          desc: lang === 'en' ? row.desc_en : row.desc_id,
          image: row.image,
          tags: JSON.parse(row.tags_json),
          category: JSON.parse(row.category_json),
          github: row.github,
          live: row.live,
          featured: Boolean(row.featured),
        }))
    : seedData.projects.map((proj, idx) => ({
        id: idx + 1,
        title: lang === 'en' ? proj.title_en : proj.title_id,
        desc: lang === 'en' ? proj.desc_en : proj.desc_id,
        image: proj.image,
        tags: proj.tags,
        category: proj.category,
        github: proj.github,
        live: proj.live,
        featured: Boolean(proj.featured),
      }))

  if (!category || category === 'all') return mapped
  return mapped.filter((p) => p.category.includes(category))
}

export async function getSkills(rawLang) {
  const lang = resolveLang(rawLang)
  const db = await ensureSeededDb()

  if (!db) {
    return seedData.skills.map((group, idx) => ({
      id: idx + 1,
      category: lang === 'en' ? group.category_en : group.category_id,
      items: group.items,
    }))
  }

  const rows = db.prepare('SELECT * FROM skill_groups ORDER BY sort_order ASC, id ASC').all()
  return rows.map((row) => ({
    id: row.id,
    category: lang === 'en' ? row.category_en : row.category_id,
    items: JSON.parse(row.items_json),
  }))
}

export async function getCertificates(rawLang) {
  const lang = resolveLang(rawLang)
  const db = await ensureSeededDb()

  if (!db) {
    return seedData.certificates.map((cert, idx) => ({
      id: idx + 1,
      title: lang === 'en' ? cert.title_en : cert.title_id,
      year: cert.year,
      issuer: lang === 'en' ? cert.issuer_en : cert.issuer_id,
      pdf: cert.pdf,
      image: cert.image,
    }))
  }

  const rows = db.prepare('SELECT * FROM certificates ORDER BY sort_order ASC, id ASC').all()
  return rows.map((row) => ({
    id: row.id,
    title: lang === 'en' ? row.title_en : row.title_id,
    year: row.year,
    issuer: lang === 'en' ? row.issuer_en : row.issuer_id,
    pdf: row.pdf,
    image: row.image,
  }))
}

export async function getPortfolioPayload(rawLang, category = 'all') {
  const lang = resolveLang(rawLang)
  const [profile, experiences, projects, skills, certificates] = await Promise.all([
    getProfile(lang),
    getExperiences(lang),
    getProjects(lang, category),
    getSkills(lang),
    getCertificates(lang),
  ])

  return {
    lang,
    profile,
    experiences,
    projects,
    skills,
    certificates,
  }
}

export async function saveContactMessage({ name, email, message, lang = 'id' }) {
  const isEn = lang === 'en'
  const cleanName = typeof name === 'string' ? name.trim() : ''
  const cleanEmail = typeof email === 'string' ? email.trim() : ''
  const cleanMessage = typeof message === 'string' ? message.trim() : ''

  if (cleanName.length < 2) {
    return {
      status: 400,
      body: {
        success: false,
        error: isEn ? 'Name must be at least 2 characters.' : 'Nama minimal 2 karakter.',
      },
    }
  }

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return {
      status: 400,
      body: {
        success: false,
        error: isEn ? 'Please enter a valid email address.' : 'Masukkan alamat email yang valid.',
      },
    }
  }

  if (cleanMessage.length < 5) {
    return {
      status: 400,
      body: {
        success: false,
        error: isEn ? 'Message must be at least 5 characters.' : 'Pesan minimal 5 karakter.',
      },
    }
  }

  const db = await ensureSeededDb()
  let insertedId = Date.now()
  if (db) {
    const result = db
      .prepare('INSERT INTO contact_messages (name, email, message, lang) VALUES (?, ?, ?, ?)')
      .run(cleanName, cleanEmail, cleanMessage, isEn ? 'en' : 'id')
    insertedId = Number(result.lastInsertRowid)
  }

  return {
    status: 201,
    body: {
      success: true,
      id: insertedId,
      message: isEn
        ? 'Message received! Thank you for reaching out.'
        : 'Pesan berhasil dikirim! Terima kasih sudah menghubungi saya.',
    },
  }
}
