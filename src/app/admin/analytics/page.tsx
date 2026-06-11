'use client'
import { useEffect, useState } from 'react'

interface AnalyticsData {
  today: number; total: number; avgDuration: number
  countries: { country: string; country_code: string; cnt: number }[]
  devices: { device_type: string; cnt: number }[]
  browsers: { browser: string; cnt: number }[]
  pages: { page_url: string; cnt: number }[]
  weekly: { day: string; cnt: number }[]
  recent: { id: number; country: string; country_code: string; city: string; device_type: string; browser: string; os: string; page_url: string; referrer: string; duration_seconds: number; created_at: string }[]
}

function flag(code: string) {
  if (!code || code === '--' || code === '??') return '🌍'
  try { return code.toUpperCase().split('').map(c => String.fromCodePoint(c.charCodeAt(0) + 127397)).join('') }
  catch { return '🌍' }
}

function fmtDuration(s: number) {
  if (!s) return '—'
  if (s < 60) return `${s}s`
  return `${Math.floor(s / 60)}m ${s % 60}s`
}

function deviceIcon(d: string) {
  if (d === 'mobile') return '📱'
  if (d === 'tablet') return '📟'
  return '🖥️'
}

const deviceColors: Record<string, string> = { mobile: 'bg-blue-500', tablet: 'bg-purple-500', desktop: 'bg-[#0d1526]' }

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics/stats').then(r => r.json()).then(d => { setData(d); setLoading(false) })
  }, [])

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-400">Loading analytics...</div>
  if (!data) return <div className="text-red-500">Failed to load analytics.</div>

  const maxWeekly = Math.max(...data.weekly.map(w => w.cnt), 1)
  const totalDevices = data.devices.reduce((a, d) => a + d.cnt, 0)
  const maxCountry = Math.max(...data.countries.map(c => c.cnt), 1)

  return (
    <div className="space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors', value: data.total, icon: '👥', color: 'text-blue-600' },
          { label: 'Today', value: data.today, icon: '📅', color: 'text-green-600' },
          { label: 'Avg. Duration', value: fmtDuration(data.avgDuration), icon: '⏱️', color: 'text-purple-600' },
          { label: 'Countries', value: data.countries.length, icon: '🌏', color: 'text-orange-600' },
        ].map(c => (
          <div key={c.label} className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{c.icon}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{c.label}</span>
            </div>
            <p className={`text-3xl font-bold ${c.color}`}>{c.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5">Last 7 Days</h3>
          <div className="flex items-end gap-2 h-36">
            {data.weekly.length === 0 ? (
              <p className="text-gray-400 text-sm w-full text-center">No data yet</p>
            ) : data.weekly.map((w, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-xs font-bold text-gray-700">{w.cnt}</span>
                <div className="w-full bg-[#0d1526] rounded-t-lg transition-all" style={{ height: `${Math.max(8, (w.cnt / maxWeekly) * 120)}px` }} />
                <span className="text-[9px] text-gray-400 whitespace-nowrap">{String(w.day).slice(5)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5">Devices</h3>
          {data.devices.length === 0 ? <p className="text-gray-400 text-sm">No data yet</p> : (
            <div className="space-y-4">
              {data.devices.map(d => (
                <div key={d.device_type}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700 capitalize">{deviceIcon(d.device_type)} {d.device_type}</span>
                    <span className="text-sm font-bold text-gray-900">{totalDevices > 0 ? Math.round((d.cnt / totalDevices) * 100) : 0}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${deviceColors[d.device_type] || 'bg-gray-400'}`}
                      style={{ width: `${totalDevices > 0 ? (d.cnt / totalDevices) * 100 : 0}%` }} />
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">{d.cnt} visits</p>
                </div>
              ))}
            </div>
          )}

          <div className="border-t border-gray-100 pt-4 mt-5">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Browsers</h4>
            {data.browsers.map(b => (
              <div key={b.browser} className="flex items-center justify-between py-1">
                <span className="text-xs text-gray-600">{b.browser}</span>
                <span className="text-xs font-bold text-gray-800">{b.cnt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Countries */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5">Top Countries</h3>
          {data.countries.length === 0 ? <p className="text-gray-400 text-sm">No data yet</p> : (
            <div className="space-y-3">
              {data.countries.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xl w-8 text-center flex-shrink-0">{flag(c.country_code)}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-gray-700 truncate">{c.country}</span>
                      <span className="text-xs font-bold text-gray-900 ml-2">{c.cnt}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#0d1526] rounded-full" style={{ width: `${(c.cnt / maxCountry) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Pages */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-5">Top Pages</h3>
          {data.pages.length === 0 ? <p className="text-gray-400 text-sm">No data yet</p> : (
            <div className="space-y-2">
              {data.pages.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 w-5">{i + 1}</span>
                    <span className="text-xs font-medium text-gray-700 truncate">{p.page_url || '/'}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-900 ml-2 flex-shrink-0 bg-gray-100 px-2 py-0.5 rounded-lg">{p.cnt}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Visitors Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="font-bold text-gray-900 mb-5">Recent Visitors</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                {['Country','City','Device','Browser','OS','Page','Referrer','Duration','Time'].map(h => (
                  <th key={h} className="text-left px-3 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {data.recent.length === 0 ? (
                <tr><td colSpan={9} className="py-8 text-center text-gray-400">No visitors yet.</td></tr>
              ) : data.recent.map(r => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2.5 text-xs font-medium text-gray-700 whitespace-nowrap">
                    {flag(r.country_code)} {r.country}
                  </td>
                  <td className="px-3 py-2.5 text-xs text-gray-500 whitespace-nowrap">{r.city || '—'}</td>
                  <td className="px-3 py-2.5 text-xs capitalize text-gray-600">{deviceIcon(r.device_type)} {r.device_type}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600">{r.browser}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600">{r.os}</td>
                  <td className="px-3 py-2.5 text-xs text-blue-600 max-w-[120px] truncate">{r.page_url}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400 max-w-[120px] truncate">{r.referrer || '—'}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-600 whitespace-nowrap">{fmtDuration(r.duration_seconds)}</td>
                  <td className="px-3 py-2.5 text-xs text-gray-400 whitespace-nowrap">{String(r.created_at).slice(0, 16).replace('T', ' ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
