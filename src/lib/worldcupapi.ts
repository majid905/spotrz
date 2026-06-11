/**
 * WorldCupAPI service — https://worldcupapi.com/
 * Replace BASE_URL and add your API key when ready.
 * All functions return empty arrays on error so the UI degrades gracefully.
 */

const BASE_URL = 'https://worldcupapi.com/api/v1'

export interface WorldCupMatch {
  id: string
  homeTeam: {
    name: string
    code: string
    score: number | null
    flag?: string
  }
  awayTeam: {
    name: string
    code: string
    score: number | null
    flag?: string
  }
  status: 'scheduled' | 'live' | 'finished'
  minute?: number
  matchDay: string
  matchTime: string
  competition: string
  venue?: string
  round?: string
  isCurrentMatch?: boolean
}

async function apiFetch<T>(path: string, revalidate = 60): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate },
      headers: {
        'Accept': 'application/json',
      },
    })
    if (!res.ok) return null
    return res.json() as Promise<T>
  } catch {
    return null
  }
}

/** Fetch all World Cup matches */
export async function getAllMatches(): Promise<WorldCupMatch[]> {
  const data = await apiFetch<WorldCupMatch[]>('/worldcupmatches', 300)
  return data ?? []
}

/** Fetch only live/current matches */
export async function getLiveMatches(): Promise<WorldCupMatch[]> {
  const data = await apiFetch<WorldCupMatch[]>('/worldcupmatches?isCurrentMatch=true', 30)
  return data ?? []
}

/** Fetch today's matches */
export async function getTodayMatches(): Promise<WorldCupMatch[]> {
  const today = new Date().toISOString().split('T')[0]
  const data = await apiFetch<WorldCupMatch[]>(`/worldcupmatches?matchDay=${today}`, 60)
  return data ?? []
}

/** Fetch upcoming (scheduled) matches */
export async function getUpcomingMatches(): Promise<WorldCupMatch[]> {
  const all = await getAllMatches()
  return all.filter(m => m.status === 'scheduled')
}

/** Fetch recent results */
export async function getRecentResults(): Promise<WorldCupMatch[]> {
  const all = await getAllMatches()
  return all.filter(m => m.status === 'finished').slice(-10)
}
