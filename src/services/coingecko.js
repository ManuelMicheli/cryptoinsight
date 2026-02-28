import { API_URLS, COIN_IDS } from '../utils/constants'

export async function fetchCryptoMarkets(currency = 'usd') {
  const ids = COIN_IDS.join(',')
  const url = `${API_URLS.COINGECKO_BASE}/coins/markets?vs_currency=${currency}&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h,7d,30d`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`CoinGecko API error: ${res.status}`)
  return res.json()
}

export async function fetchGlobalData() {
  const url = `${API_URLS.COINGECKO_BASE}/global`

  const res = await fetch(url)
  if (!res.ok) throw new Error(`CoinGecko Global API error: ${res.status}`)
  const data = await res.json()
  return data.data
}
