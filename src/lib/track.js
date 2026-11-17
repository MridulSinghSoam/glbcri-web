// Counts visits for the admin dashboard. Sends only: the page path, the site the visitor
// came from, phone/tablet/computer, and a random id for this visit. No cookies, names,
// emails or IP addresses. Visits from localhost (your own testing) are not counted.
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SUPABASE_URL, cmsEnabled, headers } from './cms'

function sessionId() {
  try {
    let id = sessionStorage.getItem('glbcri:sid')
    if (!id) {
      id = Math.random().toString(36).slice(2) + Date.now().toString(36)
      sessionStorage.setItem('glbcri:sid', id)
    }
    return id
  } catch {
    return 'no-storage'
  }
}

const device = () => (window.innerWidth < 768 ? 'mobile' : window.innerWidth < 1100 ? 'tablet' : 'desktop')

const firstReferrer = (() => {
  try {
    if (!document.referrer) return ''
    const host = new URL(document.referrer).hostname.replace(/^www\./, '')
    return host === window.location.hostname ? '' : host
  } catch {
    return ''
  }
})()

export function track(event = 'pageview', path = window.location.pathname) {
  if (!cmsEnabled || /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)) return
  fetch(`${SUPABASE_URL}/rest/v1/page_views`, {
    method: 'POST',
    keepalive: true,
    headers: { ...headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify({ path: path.slice(0, 290), referrer: firstReferrer, device: device(), session_id: sessionId(), event }),
  }).catch(() => {})
}

export function usePageTracking() {
  const { pathname } = useLocation()
  useEffect(() => {
    track('pageview', pathname)
  }, [pathname])
}
