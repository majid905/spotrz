import { db } from '@/lib/db'
import RecentResultsClient from './RecentResultsClient'

async function getFinishedMatches() {
  try {
    const [rows] = await db.query(
      `SELECT id, home_team, away_team, home_score, away_score,
              competition_type, venue, match_date, match_time, status
       FROM matches WHERE status = 'finished'
       ORDER BY match_date DESC, match_time DESC LIMIT 8`
    ) as any
    return rows || []
  } catch { return [] }
}

export default async function RecentResultsSection() {
  const matches = await getFinishedMatches()
  if (!matches.length) return null
  return <RecentResultsClient matches={matches} />
}
