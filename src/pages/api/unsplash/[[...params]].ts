// src/pages/api/unsplash/[[...params...params]].js

import { LRUCache } from 'lru-cache'
import type { NextApiRequest, NextApiResponse } from 'next'

let cache = new LRUCache({ max: 100 })

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY
const DEFAULT_WIDTH = 300 // Default width
const DEFAULT_HEIGHT = 200 // Default height

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { params: paramStringOrArray = [] } = req.query
    const params = Array.isArray(paramStringOrArray) ? paramStringOrArray : [paramStringOrArray]

    let size = `${DEFAULT_WIDTH}x${DEFAULT_HEIGHT}`
    let queryParts = []

    if (params.length === 0 || !/^\d+x\d+$/.test(params[0])) {
      size = `${DEFAULT_WIDTH}x${DEFAULT_HEIGHT}`
      queryParts = params // Treat all params as query parts
    } else {
      size = params[0]
      queryParts = params.slice(1)
    }

    const queryParamsComma = queryParts.join(',')
    const queryParamsSpace = queryParts.join(' ').replace(/,/g, ' ')

    const [width, height] = size.split('x')
    const cacheKey = `unsplash-${size}-${queryParamsComma}` + Math.round(Math.random() * 10)
    let cachedData = cache.get(cacheKey)

    let imageData: ArrayBuffer | null = null

    if (!cachedData) {
      const endpoint = `https://api.unsplash.com/photos/random?${queryParamsSpace ? `query=${encodeURIComponent(queryParamsSpace)}&` : ''}client_id=${UNSPLASH_ACCESS_KEY}`

      try {
        const response = await fetch(endpoint)

        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
        } else {
          const imageJson = await response.json()
          const resizedImageUrl = `${imageJson.urls.raw}&w=${width}&h=${height}&fit=crop`
          const imageResponse = await fetch(resizedImageUrl)
          imageData = Buffer.from(await imageResponse.arrayBuffer())
          cache.set(cacheKey, imageData)
        }
      } catch (fetchError) {}
    }

    if (!imageData && !cachedData) {
      return res.status(500).json({ error: 'Failed to fetch image and no cached images available' })
    }

    const randomImage = imageData ? imageData : cachedData
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.setHeader('Content-Type', 'image/jpeg')
    res.end(randomImage)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while proxying the request' })
  }
}
