'use client'
import { useEffect, useState } from 'react'

type Sport = 'FIFA'|'BOXING'|'UFC'|'NFL'
interface Score { id:number;sport:Sport;home_team:string;away_team:string;home_score:number;away_score:number;home_won:number;home_lost:number;home_draw:number;away_won:number;away_lost:number;away_draw:number;competition:string;match_date:string;match_time:string;status:string }

const blank: Omit<Score,'id'> = { sport:'FIFA',home_team:'',away_team:'',home_score:0,away_score:0,home_won:0,home_lost:0,home_draw:0,away_won:0,away_lost:0,away_draw:0,competition:'',match_date:'',match_time:'',status:'live' }

const sportColors: Record<Sport,string> = { FIFA:'bg-green-100 text-green-700', BOXING:'bg-red-100 text-red-700', UFC:'bg-purple-100 text-purple-700', NFL:'bg-blue-100 text-blue-700' }
const statusColors: Record<string,string> = { live:'bg-red-100 text-red-700', scheduled:'bg-blue-100 text-blue-700', finished:'bg-gray-100 text-gray-600' }

export default function ScoresAdmin() {
  const [scores, setScores] = useState<Score[]>([])
  const [modal, setModal] = useState<{open:boolean; data: Omit<Score,'id'> & {id?:number}}>({ open:false, data:{...blank} })
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/scores').then(r=>r.json()).then(setScores)
  useEffect(() => { load() }, [])

  function openAdd() { setModal({open:true, data:{...blank}}) }
  function openEdit(s:Score) { setModal({open:true, data:{...s}}) }
  function setF<K extends keyof typeof blank>(k:K, v:any) { setModal(m=>({...m,data:{...m.data,[k]:v}})) }

  async function save() {
    setSaving(true)
    const { id, ...body } = modal.data as any
    if (id) {
      await fetch(`/api/scores/${id}`, { method:'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    } else {
      await fetch('/api/scores', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    }
    setSaving(false)
    setModal(m=>({...m,open:false}))
    load()
  }

  async function del(id:number) {
    if (!confirm('Delete this score?')) return
    await fetch(`/api/scores/${id}`,{method:'DELETE'})
    load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{scores.length} live score entries</p>
        <button onClick={openAdd} className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors">
          + Add Score
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                {['Sport','Home Team','Away Team','Score','Competition','Status','Actions'].map(h=>(
                  <th key={h} className="text-left px-5 py-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {scores.length===0 ? (
                <tr><td colSpan={7} className="py-12 text-center text-gray-400">No scores yet. Add one!</td></tr>
              ) : scores.map(s=>(
                <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${sportColors[s.sport]}`}>{s.sport}</span>
                  </td>
                  <td className="px-5 py-4 font-medium text-gray-800">{s.home_team}</td>
                  <td className="px-5 py-4 font-medium text-gray-800">{s.away_team}</td>
                  <td className="px-5 py-4 font-bold text-gray-900">{s.home_score} — {s.away_score}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{s.competition}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[s.status]||'bg-gray-100 text-gray-500'}`}>{s.status}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={()=>openEdit(s)} className="text-xs font-semibold text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg">Edit</button>
                      <button onClick={()=>del(s.id)} className="text-xs font-semibold text-red-500 hover:text-red-700 bg-red-50 px-3 py-1.5 rounded-lg">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={e=>{if(e.target===e.currentTarget)setModal(m=>({...m,open:false}))}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="font-bold text-gray-900 mb-5">{modal.data.id ? 'Edit Score' : 'Add Score'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label">Sport</label>
                <select value={modal.data.sport} onChange={e=>setF('sport',e.target.value as Sport)} className="input">
                  {['FIFA','BOXING','UFC','NFL'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Status</label>
                <select value={modal.data.status} onChange={e=>setF('status',e.target.value)} className="input">
                  {['live','scheduled','finished'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Home Team</label>
                <input value={modal.data.home_team} onChange={e=>setF('home_team',e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Away Team</label>
                <input value={modal.data.away_team} onChange={e=>setF('away_team',e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Home Score</label>
                <input type="number" value={modal.data.home_score} onChange={e=>setF('home_score',+e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Away Score</label>
                <input type="number" value={modal.data.away_score} onChange={e=>setF('away_score',+e.target.value)} className="input" />
              </div>
              <div className="col-span-2">
                <label className="label">Competition</label>
                <input value={modal.data.competition} onChange={e=>setF('competition',e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Match Date</label>
                <input type="date" value={modal.data.match_date} onChange={e=>setF('match_date',e.target.value)} className="input" />
              </div>
              <div>
                <label className="label">Match Time</label>
                <input type="time" value={modal.data.match_time} onChange={e=>setF('match_time',e.target.value)} className="input" />
              </div>
              <div><label className="label">Home Won</label><input type="number" value={modal.data.home_won} onChange={e=>setF('home_won',+e.target.value)} className="input"/></div>
              <div><label className="label">Away Won</label><input type="number" value={modal.data.away_won} onChange={e=>setF('away_won',+e.target.value)} className="input"/></div>
              <div><label className="label">Home Lost</label><input type="number" value={modal.data.home_lost} onChange={e=>setF('home_lost',+e.target.value)} className="input"/></div>
              <div><label className="label">Away Lost</label><input type="number" value={modal.data.away_lost} onChange={e=>setF('away_lost',+e.target.value)} className="input"/></div>
            </div>
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button onClick={save} disabled={saving} className="bg-[#0d1526] text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-60">
                {saving?'Saving...':'Save'}
              </button>
              <button onClick={()=>setModal(m=>({...m,open:false}))} className="border border-gray-200 text-gray-600 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .label { display:block; font-size:11px; font-weight:700; color:#374151; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; }
        .input { width:100%; border:1px solid #e5e7eb; border-radius:10px; padding:10px 14px; font-size:14px; outline:none; }
        .input:focus { border-color:#93c5fd; box-shadow:0 0 0 3px rgba(147,197,253,0.2); }
      `}</style>
    </div>
  )
}
