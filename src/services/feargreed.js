import { API_URLS } from '../utils/constants'

export async function fetchFearGreedIndex() {
  const res = await fetch(API_URLS.FEAR_GREED)
  if (!res.ok) throw new Error(`Fear & Greed API error: ${res.status}`)
  const data = await res.json()
  const entry = data.data[0]
  return {
    value: parseInt(entry.value, 10),
    classification: entry.value_classification,
    timestamp: entry.timestamp,
  }
}
