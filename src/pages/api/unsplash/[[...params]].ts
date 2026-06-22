import type { NextApiRequest, NextApiResponse } from 'next'

const BE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = (req.query.params as string[]) || []

  // Try to parse first segment as WxH dimensions
  const dimRegex = /^(\d+)x(\d+)$/
  let width = 300
  let height = 200
  let queryParts: string[]

  if (params.length > 0 && dimRegex.test(params[0])) {
    const match = dimRegex.exec(params[0])!
    width = parseInt(match[1], 10)
    height = parseInt(match[2], 10)
    queryParts = params.slice(1)
  } else {
    queryParts = params
  }

  // Commas in query become spaces
  const query = queryParts.join(',').replace(/,/g, ' ').trim()

  const url = `${BE_URL}/unsplash/image?width=${width}&height=${height}&query=${encodeURIComponent(query)}`

  try {
    const upstream = await fetch(url)
    if (!upstream.ok) {
      res.status(upstream.status).json({ error: 'Upstream error' })
      return
    }

    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Cache-Control', 'no-store')

    const buffer = Buffer.from(await upstream.arrayBuffer())
    res.status(200).send(buffer)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch image' })
  }
}
