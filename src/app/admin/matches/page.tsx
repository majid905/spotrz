'use client'
import { useEffect, useState } from 'react'

interface Match { id:number;home_team:string;away_team:string;home_score:number|null;away_score:number|null;competition_type:string;venue:string;match_date:string;match_time:string;status:string }
const blank: Omit<Match,'id'> = { home_team:'',away_team:'',home_score:null,away_score:null,competition_type:'LEAGUE',venue:'',match_date:'',match_time:'',status:'scheduled' }
const statusColors: Record<string,string> = { live:'bg-red-100 text-red-700',scheduled:'bg-blue-100 text-blue-700',finished:'bg-green-100 text-green-700' }
const typeColors: Record<string,string> = { CUP:'bg-red-100 text-red-700',LEAGUE:'bg-gray-100 text-gray-700',FRIENDLY:'bg-yellow-100 text-yellow-700' }

export default function MatchesAdmin() {
  const [matches, setMatches] = useState<Match[]>([])
  const [modal, setModal] = useState<{open:boolean;data:any}>({open:false,data:{...blank}})
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/matches').then(r=>r.json()).then(setMatches)
  useEffect(()=>{load()},[])

  function setF(k:string,v:any){setModal(m=>({...m,data:{...m.data,[k]:v}}))}

  async function save(){
    setSaving(true)
    const {id,...body}=modal.data
    if(id){await fetch(`/api/matches/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}
    else{await fetch('/api/matches',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}
    setSaving(false);setModal(m=>({...m,open:false}));load()
  }

  async function del(id:number){if(!confirm('Delete?'))return;await fetch(`/api/matches/${id}`,{method:'DELETE'});load()}

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{matches.length} matches</p>
        <button onClick={()=>setModal({open:true,data:{...blank}})} className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          + Add Match
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                {['#','Home','Away','Score','Type','Venue','Date','Status','Actions'].map(h=>(<th key={h} className="text-left px-4 py-4 whitespace-nowrap">{h}</th>))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {matches.length===0?(<tr><td colSpan={9} className="py-12 text-center text-gray-400">No matches yet.</td></tr>)
               :matches.map(m=>(
                <tr key={m.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-400 text-xs font-mono">#{m.id}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 text-xs">{m.home_team}</td>
                  <td className="px-4 py-3 font-medium text-gray-800 text-xs">{m.away_team}</td>
                  <td className="px-4 py-3 font-bold text-gray-900 text-xs">{m.home_score!==null?`${m.home_score}-${m.away_score}`:'vs'}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${typeColors[m.competition_type]||'bg-gray-100 text-gray-500'}`}>{m.competition_type}</span></td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{m.venue}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{m.match_date?String(m.match_date).slice(0,10):'—'}</td>
                  <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase ${statusColors[m.status]||'bg-gray-100'}`}>{m.status}</span></td>
                  <td className="px-4 py-3"><div className="flex gap-1.5">
                    <button onClick={()=>setModal({open:true,data:{...m}})} className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg">Edit</button>
                    <button onClick={()=>del(m.id)} className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">Del</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal.open&&(
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={e=>{if(e.target===e.currentTarget)setModal(m=>({...m,open:false}))}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-5">{modal.data.id?'Edit Match':'Add Match'}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <div><label className="lb">Home Team</label><input value={modal.data.home_team} onChange={e=>setF('home_team',e.target.value)} className="inp"/></div>
                <div><label className="lb">Away Team</label><input value={modal.data.away_team} onChange={e=>setF('away_team',e.target.value)} className="inp"/></div>
              </div>
              <div><label className="lb">Home Score</label><input type="number" value={modal.data.home_score??''} onChange={e=>setF('home_score',e.target.value===''?null:+e.target.value)} className="inp"/></div>
              <div><label className="lb">Away Score</label><input type="number" value={modal.data.away_score??''} onChange={e=>setF('away_score',e.target.value===''?null:+e.target.value)} className="inp"/></div>
              <div>
                <label className="lb">Type</label>
                <select value={modal.data.competition_type} onChange={e=>setF('competition_type',e.target.value)} className="inp">
                  {['CUP','LEAGUE','FRIENDLY'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="lb">Status</label>
                <select value={modal.data.status} onChange={e=>setF('status',e.target.value)} className="inp">
                  {['scheduled','live','finished'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="col-span-2"><label className="lb">Venue</label><input value={modal.data.venue} onChange={e=>setF('venue',e.target.value)} className="inp"/></div>
              <div><label className="lb">Date</label><input type="date" value={modal.data.match_date?String(modal.data.match_date).slice(0,10):''} onChange={e=>setF('match_date',e.target.value)} className="inp"/></div>
              <div><label className="lb">Time</label><input type="time" value={modal.data.match_time?String(modal.data.match_time).slice(0,5):''} onChange={e=>setF('match_time',e.target.value)} className="inp"/></div>
            </div>
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button onClick={save} disabled={saving} className="bg-[#0d1526] text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-60">{saving?'Saving...':'Save'}</button>
              <button onClick={()=>setModal(m=>({...m,open:false}))} className="border border-gray-200 text-gray-600 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`.lb{display:block;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}.inp{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:14px;outline:none;}`}</style>
    </div>
  )
}
