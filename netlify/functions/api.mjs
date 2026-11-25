import {
  getCertificates,
  getExperiences,
  getPortfolioPayload,
  getProfile,
  getProjects,
  getSkills,
  resolveLang,
  saveContactMessage,
} from '../../backend/src/services/portfolioService.js'

export default async (req) => {
  const url = new URL(req.url)
  const pathname = url.pathname.replace(/\/+$/, '') || '/'
  const lang = resolveLang(url.searchParams.get('lang'))
  const category = url.searchParams.get('category') || 'all'

  try {
    if (req.method === 'GET' && pathname === '/api/health') {
      return Response.json({
        status: 'ok',
        service: 'portofolio-aboy-netlify-api',
        timestamp: new Date().toISOString(),
      })
    }

    if (req.method === 'GET' && pathname === '/api/portfolio') {
      return Response.json(await getPortfolioPayload(lang, category))
    }

    if (req.method === 'GET' && pathname === '/api/profile') {
      const profile = await getProfile(lang)
      if (!profile) {
        return Response.json({ error: 'Profile not found' }, { status: 404 })
      }
      return Response.json({ lang, data: profile })
    }

    if (req.method === 'GET' && pathname === '/api/experiences') {
      return Response.json({ lang, data: await getExperiences(lang) })
    }

    if (req.method === 'GET' && pathname === '/api/projects') {
      return Response.json({ lang, data: await getProjects(lang, category) })
    }

    if (req.method === 'GET' && pathname === '/api/skills') {
      return Response.json({ lang, data: await getSkills(lang) })
    }

    if (req.method === 'GET' && pathname === '/api/certificates') {
      return Response.json({ lang, data: await getCertificates(lang) })
    }

    if (req.method === 'POST' && pathname === '/api/contact') {
      const body = await req.json().catch(() => ({}))
      const result = await saveContactMessage(body)
      return Response.json(result.body, { status: result.status })
    }

    return Response.json({ error: 'Endpoint not found' }, { status: 404 })
  } catch (err) {
    console.error('API function error:', err)
    return Response.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export const config = {
  path: '/api/*',
}
