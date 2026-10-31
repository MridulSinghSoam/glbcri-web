// Loads the latest Instagram posts.
//
// Meta shut down the Instagram Basic Display API on 4 Dec 2024, so a website
// can only show posts from a Business/Creator account, using a token that must
// stay on a server. The token lives in the serverless function /api/instagram
// (see /api/instagram.js). The browser only ever calls that function.
//
// Alternative without a backend: set VITE_INSTAGRAM_FEED_URL to a feed
// service's JSON URL (e.g. Behold). If both fail, we return [] and the UI
// shows its fallback tiles — the home page is never left with an empty box.

const FEED_URL = import.meta.env.VITE_INSTAGRAM_FEED_URL || '/api/instagram'

function normalise(p) {
  return {
    id: p.id,
    caption: p.caption || '',
    image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url || p.mediaUrl || p.sizes?.medium?.mediaUrl,
    permalink: p.permalink,
    isVideo: p.media_type === 'VIDEO' || p.mediaType === 'VIDEO',
    timestamp: p.timestamp,
  }
}

export async function fetchInstagramPosts(limit = 6) {
  try {
    const res = await fetch(FEED_URL, { headers: { Accept: 'application/json' } })
    if (!res.ok) return []
    const type = res.headers.get('content-type') || ''
    if (!type.includes('json')) return [] // e.g. dev server returning index.html
    const json = await res.json()
    const list = Array.isArray(json) ? json : json.data || json.posts || []
    return list.map(normalise).filter((p) => p.image).slice(0, limit)
  } catch {
    return []
  }
}
