import { cache } from 'react'
import { db } from './db'

export interface SiteSettings {
  id: number
  site_title: string
  meta_description: string
  favicon_url: string
  logo_url: string
  site_name: string
  social_facebook: string
  social_twitter: string
  social_instagram: string
  social_youtube: string
  contact_email: string
  contact_phone: string
  contact_address: string
}

const defaults: SiteSettings = {
  id: 1,
  site_title: 'Sportz - Live Scores | FIFA · Boxing · UFC · NFL',
  meta_description: 'Watch live scores for FIFA, Boxing, UFC, and NFL.',
  favicon_url: '/favicon.ico',
  logo_url: '/logo.png',
  site_name: 'Sportz',
  social_facebook: '',
  social_twitter: '',
  social_instagram: '',
  social_youtube: '',
  contact_email: '',
  contact_phone: '',
  contact_address: '',
}

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const [rows] = await db.query('SELECT * FROM site_settings LIMIT 1') as any
    if (rows?.[0]) return { ...defaults, ...rows[0] }
  } catch {}
  return defaults
})
