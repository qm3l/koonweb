'use client';
import { createClient } from '@/lib/supabase/browser';
import { useEffect, useState } from 'react';

export default function HomepageAdmin(){
  const [rows,setRows]=useState<any[]>([]), [media,setMedia]=useState<any[]>([]), [busy,setBusy]=useState(false);
  const [form,setForm]=useState({title:'',subtitle:'',image_url:'',href:'',sort_order:0});
  async function load(){const s=createClient(); const [b,m]=await Promise.all([s.from('home_banners').select('*').order('sort_order'),s.from('media_assets').select('id,public_url,path').order('created_at',{ascending:false})]); setRows(b.data||[]); setMedia(m.data||[])}
  useEffect(()=>{load()},[]);
  async function add(){setBusy(true);const s=createClient();const {error}=await s.from('home_banners').insert({...form,enabled:true});if(error) alert(error.message);else setForm({title:'',subtitle:'',image_url:'',href:'',sort_order:0});await load();setBusy(false)}
  async function toggle(id:string,enabled:boolean){const s=createClient();await s.from('home_banners').update({enabled:!enabled}).eq('id',id);load()}
  async function del(id:string){const s=createClient();await s.from('home_banners').delete().eq('id',id);load()}
  return <div><h1 className="text-3xl font-bold">بانرات الصفحة الرئيسية</h1><p className="text-koon-muted mt-2">البانرات تحت تحكمك، أما بوسترات الأعمال فتأتي تلقائياً من AniList.</p>
    <div className="glass-panel rounded-2xl p-5 mt-6 grid gap-3 md:grid-cols-2">
      <input placeholder="العنوان" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} className="input"/>
      <input placeholder="النص الثانوي" value={form.subtitle} onChange={e=>setForm({...form,subtitle:e.target.value})} className="input"/>
      <select value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} className="input md:col-span-2"><option value="">اختر صورة من مكتبة الوسائط</option>{media.map(x=><option key={x.id} value={x.public_url}>{x.path}</option>)}</select>
      <input placeholder="أو ضع رابط صورة خارجي" value={form.image_url} onChange={e=>setForm({...form,image_url:e.target.value})} className="input md:col-span-2"/>
      <input placeholder="الرابط عند الضغط (اختياري)" value={form.href} onChange={e=>setForm({...form,href:e.target.value})} className="input"/>
      <input type="number" placeholder="الترتيب" value={form.sort_order} onChange={e=>setForm({...form,sort_order:Number(e.target.value)})} className="input"/>
      <button disabled={busy||!form.title||!form.image_url} onClick={add} className="polygon-btn bg-koon-cyan text-black font-bold py-3 md:col-span-2">{busy?'جاري الحفظ...':'إضافة البانر'}</button>
    </div>
    <div className="grid gap-4 mt-6">{rows.map(r=><div key={r.id} className="glass-panel rounded-2xl overflow-hidden flex gap-4 items-center"><img src={r.image_url} className="w-56 h-28 object-cover"/><div className="p-4 flex-1"><b>{r.title}</b><p className="text-sm text-koon-muted mt-1">{r.subtitle}</p><span className="text-xs text-koon-muted">الترتيب: {r.sort_order} · {r.enabled?'ظاهر':'مخفي'}</span></div><button onClick={()=>toggle(r.id,r.enabled)} className="px-3 text-koon-cyan">{r.enabled?'إخفاء':'إظهار'}</button><button onClick={()=>del(r.id)} className="px-5 text-red-400">حذف</button></div>)}</div>
  </div>
}
