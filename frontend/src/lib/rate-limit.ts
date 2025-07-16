import {LRUCache} from 'lru-cache'

interface RateLimitOptions {
  interval?: number // in milliseconds
  uniqueTokenPerInterval?: number
}

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  })

  return {
    check: (limit: number, token: string) => {
      const tokenCount = tokenCache.get(token) || [0]

      if (tokenCount[0] === 0) {
        tokenCache.set(token, tokenCount)
      }

      tokenCount[0] += 1

      if (tokenCount[0] > limit) {
        throw new Error('Rate limit exceeded')
      }
    }
  }
}