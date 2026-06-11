'use client'
import { useEffect, useState } from 'react'
import ImageUpload from '@/components/ImageUpload'

interface Stream {
  id: number; title: string; team1_name: string; team1_logo: string
  team2_name: string; team2_logo: string; video_url: string; thumbnail: string
  competition: string; score1: string; score2: string; stream_status: string
  viewers: number; match_date: string; match_time: string; is_active: boolean; sort_order: number
}

const blank = {
  title:'',team1_name:'',team1_logo:'',team2_name:'',team2_logo:'',
  video_url:'',thumbnail:'',competition:'',score1:'0',score2:'0',
  stream_status:'LIVE',viewers:0,match_date:'',match_time:'',is_active:true,sort_order:0
}

const statusColors: Record<string, string> = { LIVE:'bg-red-100 text-red-700', UPCOMING:'bg-blue-100 text-blue-700', ENDED:'bg-gray-100 text-gray-600' }

export default function LiveMatchesAdmin() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [modal, setModal] = useState<{open:boolean;data:any}>({open:false,data:{...blank}})
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/live-streams?all=1').then(r=>r.json()).then(setStreams)
  useEffect(()=>{load()},[])

  function setF(k:string,v:any){setModal(m=>({...m,data:{...m.data,[k]:v}}))}

  async function save(){
    setSaving(true)
    const {id,...body}=modal.data
    if(id) await fetch(`/api/live-streams/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    else await fetch('/api/live-streams',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    setSaving(false);setModal(m=>({...m,open:false}));load()
  }

  async function del(id:number){if(!confirm('Delete stream?'))return;await fetch(`/api/live-streams/${id}`,{method:'DELETE'});load()}

  async function toggleActive(s:Stream){
    await fetch(`/api/live-streams/${s.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...s,is_active:!s.is_active})})
    load()
  }

  const inp = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 text-gray-900 bg-white'
  const lb = 'block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5'

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{streams.length} streams</p>
        <button onClick={()=>setModal({open:true,data:{...blank}})} className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          + Add Live Stream
        </button>
      </div>

      <div className="space-y-3">
        {streams.length===0?(
          <div className="bg-white rounded-2xl shadow-sm py-12 text-center text-gray-400">No streams yet.</div>
        ):streams.map(s=>(
          <div key={s.id} className={`bg-white rounded-2xl shadow-sm p-4 border-l-4 ${s.is_active?'border-l-red-500':'border-l-gray-200'}`}>
            <div className="flex items-start gap-4">
              {s.thumbnail && <img src={s.thumbnail} alt="" className="w-20 h-14 object-cover rounded-lg flex-shrink-0"/>}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColors[s.stream_status]||'bg-gray-100'}`}>{s.stream_status}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.is_active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-400'}`}>{s.is_active?'Active':'Hidden'}</span>
                  {s.competition && <span className="text-[10px] text-gray-500 font-medium">{s.competition}</span>}
                </div>
                <p className="font-bold text-gray-900 text-sm">{s.team1_name} <span className="text-gray-400 font-normal">{s.score1}:{s.score2}</span> {s.team2_name}</p>
                <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{s.title}</p>
                <p className="text-gray-400 text-[10px] mt-1 truncate">{s.video_url}</p>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button onClick={()=>toggleActive(s)} className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${s.is_active?'bg-gray-50 text-gray-500':'bg-green-50 text-green-600'}`}>
                  {s.is_active?'Hide':'Show'}
                </button>
                <button onClick={()=>setModal({open:true,data:{...s}})} className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg">Edit</button>
                <button onClick={()=>del(s.id)} className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal.open&&(
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={e=>{if(e.target===e.currentTarget)setModal(m=>({...m,open:false}))}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-5">{modal.data.id?'Edit Stream':'Add Stream'}</h3>
            <div className="space-y-4">
              <div><label className={lb}>Stream Title</label><input value={modal.data.title} onChange={e=>setF('title',e.target.value)} className={inp} placeholder="Manchester City vs Arsenal - Premier League"/></div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lb}>Status</label>
                  <select value={modal.data.stream_status} onChange={e=>setF('stream_status',e.target.value)} className={inp}>
                    {['LIVE','UPCOMING','ENDED'].map(v=><option key={v}>{v}</option>)}
                  </select>
                </div>
                <div><label className={lb}>Competition</label><input value={modal.data.competition} onChange={e=>setF('competition',e.target.value)} className={inp} placeholder="Premier League"/></div>
              </div>

              {/* Team 1 */}
              <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Team 1</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={lb}>Name</label><input value={modal.data.team1_name} onChange={e=>setF('team1_name',e.target.value)} className={inp}/></div>
                  <div><label className={lb}>Score</label><input value={modal.data.score1} onChange={e=>setF('score1',e.target.value)} className={inp} placeholder="0"/></div>
                </div>
                <div>
                  <label className={lb}>Team 1 Logo</label>
                  <ImageUpload currentUrl={modal.data.team1_logo} onUpload={url=>setF('team1_logo',url)} previewHeight="h-20" label="Upload Logo"/>
                  <input value={modal.data.team1_logo} onChange={e=>setF('team1_logo',e.target.value)} className={`mt-1.5 ${inp} text-gray-400`} placeholder="or paste URL..."/>
                </div>
              </div>

              {/* Team 2 */}
              <div className="border border-gray-100 rounded-xl p-4 space-y-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Team 2</p>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={lb}>Name</label><input value={modal.data.team2_name} onChange={e=>setF('team2_name',e.target.value)} className={inp}/></div>
                  <div><label className={lb}>Score</label><input value={modal.data.score2} onChange={e=>setF('score2',e.target.value)} className={inp} placeholder="0"/></div>
                </div>
                <div>
                  <label className={lb}>Team 2 Logo</label>
                  <ImageUpload currentUrl={modal.data.team2_logo} onUpload={url=>setF('team2_logo',url)} previewHeight="h-20" label="Upload Logo"/>
                  <input value={modal.data.team2_logo} onChange={e=>setF('team2_logo',e.target.value)} className={`mt-1.5 ${inp} text-gray-400`} placeholder="or paste URL..."/>
                </div>
              </div>

              {/* Video URL */}
              <div>
                <label className={lb}>Video / Stream URL</label>
                <input value={modal.data.video_url} onChange={e=>setF('video_url',e.target.value)} className={inp}
                  placeholder="https://youtube.com/watch?v=... or stream embed URL"/>
                <p className="text-[11px] text-gray-400 mt-1">Supports: YouTube links, direct .mp4 URLs, or any iframe embed URL</p>
              </div>

              {/* Thumbnail */}
              <div>
                <label className={lb}>Thumbnail Image <span className="normal-case font-normal text-gray-400">(optional — shown on cards)</span></label>
                <ImageUpload currentUrl={modal.data.thumbnail} onUpload={url=>setF('thumbnail',url)} previewHeight="h-28" label="Upload Thumbnail"/>
                <input value={modal.data.thumbnail} onChange={e=>setF('thumbnail',e.target.value)} className={`mt-1.5 ${inp} text-gray-400`} placeholder="or paste URL..."/>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div><label className={lb}>Viewers</label><input type="number" value={modal.data.viewers} onChange={e=>setF('viewers',+e.target.value)} className={inp}/></div>
                <div><label className={lb}>Date</label><input type="date" value={modal.data.match_date?String(modal.data.match_date).slice(0,10):''} onChange={e=>setF('match_date',e.target.value)} className={inp}/></div>
                <div><label className={lb}>Time</label><input type="time" value={modal.data.match_time?String(modal.data.match_time).slice(0,5):''} onChange={e=>setF('match_time',e.target.value)} className={inp}/></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><label className={lb}>Sort Order</label><input type="number" value={modal.data.sort_order} onChange={e=>setF('sort_order',+e.target.value)} className={inp}/></div>
                <div className="flex items-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!modal.data.is_active} onChange={e=>setF('is_active',e.target.checked)} className="w-4 h-4 rounded"/>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Show on Site</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button onClick={save} disabled={saving} className="bg-[#0d1526] text-white text-sm font-bold px-6 py-2.5 rounded-xl disabled:opacity-60">{saving?'Saving...':'Save'}</button>
              <button onClick={()=>setModal(m=>({...m,open:false}))} className="border border-gray-200 text-gray-600 text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-gray-50">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
