const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')

export async function fetchPortfolio(lang = 'id') {
  const response = await fetch(`${API_BASE}/api/portfolio?lang=${encodeURIComponent(lang)}`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`)
  }
  return response.json()
}

export async function submitContact(payload) {
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(data.error || `Request failed (${response.status})`)
  }
  return data
}
