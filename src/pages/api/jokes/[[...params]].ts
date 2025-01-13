// src/pages/api/jokes/[...params].js

import { LRUCache } from 'lru-cache'
import type { NextApiRequest, NextApiResponse } from 'next'

const JOKES_TTL = 1000
const JOKES_CACHE_SIZE = 100
let cache = new LRUCache({ max: JOKES_CACHE_SIZE, ttl: JOKES_TTL })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cacheKey = `jokes-` + Math.round(Math.random() * 10)
    let cachedData = cache.get(cacheKey)
    let jokeJson: string | undefined
    if (!cachedData) {
      const endpoint = ` https://official-joke-api.appspot.com/jokes/random`
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`)
        } else {
          jokeJson = await response.text()
          cache.set(cacheKey, jokeJson)
        }
      } catch (fetchError) {}
    }

    if (!jokeJson && !cachedData) {
      return res.status(500).json({ error: 'Failed to fetch image and no cached images available' })
    }
    const randomJoke = jokeJson ? jokeJson : cachedData
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
    res.setHeader('Pragma', 'no-cache')
    res.setHeader('Expires', '0')
    res.setHeader('Content-Type', 'application/json') // Set the content type header
    res.end(randomJoke)
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while proxying the request' })
  }
}
