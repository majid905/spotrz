import { db } from '@/lib/db'
import FAQClient from './FAQClient'

async function getFAQs() {
  try {
    const [rows] = await db.query(
      `SELECT id, question, answer FROM faq WHERE is_active = 1 ORDER BY sort_order ASC LIMIT 12`
    ) as any
    return rows || []
  } catch { return [] }
}

export default async function FAQSection() {
  const faqs = await getFAQs()
  if (!faqs.length) return null
  return <FAQClient faqs={faqs} />
}
