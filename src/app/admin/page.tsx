'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  matches: number; live: number; blogs: number; faqs: number; users: number
  recent: { id:number; home_team:string; away_team:string; home_score:number|null; away_score:number|null; competition_type:string; match_date:string; status:string }[]
}

const statusColor: Record<string, string> = {
  finished: 'bg-green-100 text-green-700',
  live: 'bg-red-100 text-red-700',
  scheduled: 'bg-blue-100 text-blue-700',
}

const monthBars = [20,35,45,30,55,80,70,40,60,45,50,65]
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ matches:0,live:0,blogs:0,faqs:0,users:0,recent:[] })

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(setStats).catch(() => {})
  }, [])

  const cards = [
    { label: 'Total Matches', value: stats.matches, dark: false, trend: '+12%', color: 'text-green-500' },
    { label: 'Live Now', value: stats.live, dark: true, trend: 'Active', color: 'text-red-400' },
    { label: 'Blog Posts', value: stats.blogs, dark: false, trend: '+3', color: 'text-blue-500' },
    { label: 'FAQ Items', value: stats.faqs, dark: false, badge: stats.faqs, badgeUp: true },
    { label: 'Total Users', value: stats.users, dark: false, badge: stats.users, badgeUp: false },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`rounded-2xl p-5 shadow-sm ${c.dark ? 'bg-[#0d1526] text-white' : 'bg-white text-gray-900'}`}
          >
            <p className={`text-xs font-semibold uppercase tracking-widest mb-3 ${c.dark ? 'text-gray-400' : 'text-gray-500'}`}>
              {c.label}
            </p>
            <div className="flex items-end justify-between">
              <span className={`text-3xl font-bold ${c.dark ? 'text-white' : 'text-gray-900'}`}>{c.value}</span>
              {c.trend && (
                <span className={`text-xs font-semibold ${c.dark ? 'text-red-400' : c.color}`}>{c.trend}</span>
              )}
              {c.badge !== undefined && (
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${c.badgeUp ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {c.badge} {c.badgeUp ? '↗' : '↘'}
                </span>
              )}
            </div>
            <p className={`text-xs mt-2 ${c.dark ? 'text-gray-500' : 'text-gray-400'}`}>Current month</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Chart + Recent Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bar Chart Card */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-gray-900">Match Activity</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stats.matches} Matches</p>
                <p className="text-xs text-green-500 font-semibold mt-0.5">↗ 20% than last month</p>
              </div>
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
                <button className="text-gray-400 hover:text-gray-600 text-xs">‹</button>
                <span className="text-xs font-semibold text-gray-700 px-2">2026</span>
                <button className="text-gray-400 hover:text-gray-600 text-xs">›</button>
              </div>
            </div>

            {/* Simple bar chart */}
            <div className="flex items-end gap-1.5 h-32">
              {monthBars.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-t-sm transition-all ${i === 5 ? 'bg-[#0d1526]' : i === 6 ? 'bg-cyan-400' : 'bg-blue-100'}`}
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[9px] text-gray-400 hidden sm:block">{months[i]}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-cyan-400 inline-block"/><span className="text-xs text-gray-500">Last Month</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-[#0d1526] inline-block"/><span className="text-xs text-gray-500">Running Month</span></div>
            </div>
          </div>

          {/* Recent Matches Table */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900">Recent Matches</h3>
              <Link href="/admin/matches" className="text-xs font-semibold text-blue-500 hover:underline">View All</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    <th className="text-left pb-3 pr-4">#</th>
                    <th className="text-left pb-3 pr-4">Home</th>
                    <th className="text-left pb-3 pr-4">Away</th>
                    <th className="text-left pb-3 pr-4">Score</th>
                    <th className="text-left pb-3 pr-4">Type</th>
                    <th className="text-left pb-3 pr-4">Date</th>
                    <th className="text-left pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {stats.recent.length === 0 ? (
                    <tr><td colSpan={7} className="py-8 text-center text-gray-400 text-sm">No matches yet</td></tr>
                  ) : stats.recent.map(m => (
                    <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-400 font-mono text-xs">#{m.id}</td>
                      <td className="py-3 pr-4 font-medium text-gray-800 text-xs">{m.home_team}</td>
                      <td className="py-3 pr-4 font-medium text-gray-800 text-xs">{m.away_team}</td>
                      <td className="py-3 pr-4 font-bold text-gray-900 text-xs">
                        {m.home_score !== null ? `${m.home_score} - ${m.away_score}` : '—'}
                      </td>
                      <td className="py-3 pr-4">
                        <span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase px-2 py-1 rounded">
                          {m.competition_type}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-gray-400 text-xs">{m.match_date ? String(m.match_date).slice(0,10) : '—'}</td>
                      <td className="py-3">
                        <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColor[m.status] || 'bg-gray-100 text-gray-500'}`}>
                          {m.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Performance Card */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-5">Site Performance</h3>

            {/* Gauge */}
            <div className="flex flex-col items-center mb-5">
              <div className="relative w-32 h-16 overflow-hidden mb-3">
                <div className="absolute inset-0 rounded-t-full border-[12px] border-gray-100" style={{ borderBottom: 'none' }} />
                <div className="absolute inset-0 rounded-t-full border-[12px] border-red-500 transition-all" style={{ borderBottom: 'none', clipPath: 'polygon(0 0, 45% 0, 45% 100%, 0 100%)' }} />
                <div className="absolute inset-0 rounded-t-full border-[12px] border-[#0d1526]" style={{ borderBottom: 'none', clipPath: 'polygon(55% 0, 100% 0, 100% 100%, 55% 100%)' }} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-xs text-gray-400">Score</p>
                  <p className="text-2xl font-black text-gray-900">80</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center">Performance is 10% better this week</p>
            </div>

            <button className="w-full bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-xl transition-colors">
              View Details
            </button>

            {/* Legend */}
            <div className="mt-5 space-y-2">
              {[
                { color: 'bg-cyan-400', label: 'Completed', value: stats.matches },
                { color: 'bg-[#0d1526]', label: 'Scheduled', value: stats.matches },
                { color: 'bg-red-500', label: 'Live Now', value: stats.live },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full ${item.color} inline-block`} />
                    <span className="text-xs text-gray-600">{item.label}</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { href: '/admin/hero', label: 'Edit Hero Section', color: 'bg-purple-50 text-purple-700' },
                { href: '/admin/scores', label: 'Update Live Scores', color: 'bg-red-50 text-red-700' },
                { href: '/admin/matches', label: 'Add New Match', color: 'bg-blue-50 text-blue-700' },
                { href: '/admin/blog', label: 'Write Blog Post', color: 'bg-green-50 text-green-700' },
              ].map(a => (
                <Link key={a.href} href={a.href} className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold ${a.color} hover:opacity-80 transition`}>
                  <span>{a.label}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
