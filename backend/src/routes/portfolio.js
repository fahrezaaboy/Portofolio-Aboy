import { Router } from 'express'
import {
  getCertificates,
  getExperiences,
  getPortfolioPayload,
  getProfile,
  getProjects,
  getSkills,
  resolveLang,
} from '../services/portfolioService.js'

const router = Router()

router.get('/portfolio', async (req, res, next) => {
  try {
    const payload = await getPortfolioPayload(req.query.lang, req.query.category)
    res.json(payload)
  } catch (err) {
    next(err)
  }
})

router.get('/profile', async (req, res, next) => {
  try {
    const lang = resolveLang(req.query.lang)
    const profile = await getProfile(lang)
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' })
    }
    return res.json({ lang, data: profile })
  } catch (err) {
    return next(err)
  }
})

router.get('/experiences', async (req, res, next) => {
  try {
    const lang = resolveLang(req.query.lang)
    res.json({ lang, data: await getExperiences(lang) })
  } catch (err) {
    next(err)
  }
})

router.get('/projects', async (req, res, next) => {
  try {
    const lang = resolveLang(req.query.lang)
    res.json({ lang, data: await getProjects(lang, req.query.category) })
  } catch (err) {
    next(err)
  }
})

router.get('/skills', async (req, res, next) => {
  try {
    const lang = resolveLang(req.query.lang)
    res.json({ lang, data: await getSkills(lang) })
  } catch (err) {
    next(err)
  }
})

router.get('/certificates', async (req, res, next) => {
  try {
    const lang = resolveLang(req.query.lang)
    res.json({ lang, data: await getCertificates(lang) })
  } catch (err) {
    next(err)
  }
})

export default router
