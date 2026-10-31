// Vercel serverless function: GET /api/instagram
//
// Setup (one time, done by whoever manages GLBCRI's Instagram):
//  1. Switch the Instagram account to a Professional (Business or Creator) account.
//  2. In developers.facebook.com create an app with "Instagram API with Instagram Login",
//     add the account, and generate a long-lived access token.
//  3. In Vercel → Project → Settings → Environment Variables add IG_ACCESS_TOKEN.
//
// The token never reaches the browser. Responses are cached at the edge for 1 hour.
// Long-lived tokens expire, so refresh it periodically (V2: the admin panel will do this).

export default async function handler(req, res) {
  const token = process.env.IG_ACCESS_TOKEN
  if (!token) {
    res.status(200).json({ data: [], note: 'IG_ACCESS_TOKEN is not set' })
    return
  }

  const fields = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
  const url = `https://graph.instagram.com/me/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(token)}`

  try {
    const r = await fetch(url)
    const json = await r.json()
    if (!r.ok) {
      res.status(502).json({ data: [], error: json?.error?.message || 'Instagram request failed' })
      return
    }
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
    res.status(200).json({ data: json.data || [] })
  } catch (err) {
    res.status(502).json({ data: [], error: String(err) })
  }
}
