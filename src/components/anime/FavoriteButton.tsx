'use client';
import {useEffect,useState} from 'react';
import {createClient} from '@/lib/supabase/browser';
export function FavoriteButton({animeId}:{animeId:number}){
 const [active,setActive]=useState(false); const [busy,setBusy]=useState(false);
 useEffect(()=>{(async()=>{const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user)return;const {data}=await s.from('favorites').select('anime_id').eq('user_id',user.id).eq('anime_id',animeId).maybeSingle();setActive(!!data)})()},[animeId]);
 async function toggle(){setBusy(true);const s=createClient();const {data:{user}}=await s.auth.getUser();if(!user){location.href='/login';return}if(active){await s.from('favorites').delete().eq('user_id',user.id).eq('anime_id',animeId);setActive(false)}else{const {error}=await s.from('favorites').insert({user_id:user.id,anime_id:animeId});if(!error)setActive(true)}setBusy(false)}
 return <button disabled={busy} onClick={toggle} className={`polygon-btn px-5 py-3 text-xs font-bold ${active?'bg-koon-lime text-black':'glass-panel text-white hover:border-koon-cyan/50'}`}>{active?'★ في المفضلة':'☆ أضف للمفضلة'}</button>
}
