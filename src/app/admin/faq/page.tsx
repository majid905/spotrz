'use client'
import { useEffect, useState } from 'react'

interface FAQ { id:number;question:string;answer:string;sort_order:number;is_active:boolean }
const blank: Omit<FAQ,'id'> = { question:'',answer:'',sort_order:0,is_active:true }

export default function FAQAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [modal, setModal] = useState<{open:boolean;data:any}>({open:false,data:{...blank}})
  const [saving, setSaving] = useState(false)

  const load = () => fetch('/api/faq').then(r=>r.json()).then(setFaqs)
  useEffect(()=>{load()},[])

  function setF(k:string,v:any){setModal(m=>({...m,data:{...m.data,[k]:v}}))}

  async function save(){
    setSaving(true)
    const {id,...body}=modal.data
    if(id){await fetch(`/api/faq/${id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}
    else{await fetch('/api/faq',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})}
    setSaving(false);setModal(m=>({...m,open:false}));load()
  }

  async function del(id:number){if(!confirm('Delete FAQ?'))return;await fetch(`/api/faq/${id}`,{method:'DELETE'});load()}

  async function toggleActive(f:FAQ){
    await fetch(`/api/faq/${f.id}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({...f,is_active:!f.is_active})})
    load()
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{faqs.length} FAQ items</p>
        <button onClick={()=>setModal({open:true,data:{...blank}})} className="bg-[#0d1526] hover:bg-[#1a2744] text-white text-xs font-bold px-5 py-2.5 rounded-xl">
          + Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {faqs.length===0?(
          <div className="bg-white rounded-2xl shadow-sm py-12 text-center text-gray-400">No FAQs yet.</div>
        ):faqs.map(f=>(
          <div key={f.id} className={`bg-white rounded-2xl shadow-sm p-5 border-l-4 transition-colors ${f.is_active?'border-l-[#0d1526]':'border-l-gray-200'}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-gray-400 font-mono">#{f.sort_order||f.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${f.is_active?'bg-green-100 text-green-700':'bg-gray-100 text-gray-500'}`}>
                    {f.is_active?'Active':'Hidden'}
                  </span>
                </div>
                <p className="font-bold text-gray-900 text-sm mb-1 leading-snug">{f.question}</p>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button onClick={()=>toggleActive(f)} className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${f.is_active?'bg-gray-50 text-gray-500':'bg-green-50 text-green-600'}`}>
                  {f.is_active?'Hide':'Show'}
                </button>
                <button onClick={()=>setModal({open:true,data:{...f}})} className="text-xs font-semibold text-blue-500 bg-blue-50 px-2.5 py-1 rounded-lg">Edit</button>
                <button onClick={()=>del(f.id)} className="text-xs font-semibold text-red-500 bg-red-50 px-2.5 py-1 rounded-lg">Del</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {modal.open&&(
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={e=>{if(e.target===e.currentTarget)setModal(m=>({...m,open:false}))}}>
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-5">{modal.data.id?'Edit FAQ':'Add FAQ'}</h3>
            <div className="space-y-4">
              <div><label className="lb">Question</label><input value={modal.data.question} onChange={e=>setF('question',e.target.value)} className="inp"/></div>
              <div><label className="lb">Answer</label><textarea value={modal.data.answer} onChange={e=>setF('answer',e.target.value)} rows={5} className="inp resize-none"/></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="lb">Sort Order</label><input type="number" value={modal.data.sort_order} onChange={e=>setF('sort_order',+e.target.value)} className="inp"/></div>
                <div className="flex flex-col justify-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={!!modal.data.is_active} onChange={e=>setF('is_active',e.target.checked)} className="w-4 h-4 rounded"/>
                    <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Active</span>
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
      <style jsx>{`.lb{display:block;font-size:11px;font-weight:700;color:#374151;text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}.inp{width:100%;border:1px solid #e5e7eb;border-radius:10px;padding:10px 14px;font-size:14px;outline:none;}.inp:focus{border-color:#93c5fd;box-shadow:0 0 0 3px rgba(147,197,253,.2)}`}</style>
    </div>
  )
}
