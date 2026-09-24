import { getUser,getProfile } from '@/lib/auth';
import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage(){
  const user=await getUser();
  const profile=await getProfile();
  if(!user) return <main className="px-4 py-16 text-center"><h1 className="text-xl font-bold">حسابك</h1><p className="text-koon-muted mt-2">سجّل الدخول لحفظ مكتبتك وسجل المشاهدة.</p><a href="/login" className="inline-block mt-6 polygon-btn bg-koon-cyan text-black px-6 py-3 font-bold">تسجيل الدخول</a></main>;
  async function signOut(){'use server'; const s=await createClient(); await s.auth.signOut();}
  const name=profile?.display_name||user.user_metadata?.full_name||user.email||'مستخدم Koon';
  const avatar=profile?.avatar_url||user.user_metadata?.avatar_url;
  return <div className="px-4 py-8 space-y-6 max-w-3xl mx-auto">
    <section className="koon-panel p-5 flex items-center gap-4">
      {avatar?<img src={avatar} alt="" className="w-16 h-16 rounded-2xl object-cover border border-koon-cyan/40"/>:<div className="w-16 h-16 rounded-2xl bg-koon-cyan/10 border border-koon-cyan/30 grid place-items-center text-2xl font-bold text-koon-cyan">{name[0]}</div>}
      <div className="min-w-0 text-right flex-1"><h1 className="text-lg font-bold truncate">{name}</h1><p className="text-xs text-koon-muted truncate dir-ltr text-right">{user.email}</p><span className="inline-block mt-2 text-[10px] text-koon-lime font-mono">{profile?.role?.toUpperCase()||'USER'}</span></div>
    </section>
    <section className="koon-panel p-5 space-y-4 text-right"><h2 className="font-bold">الحساب والمزامنة</h2><p className="text-sm text-koon-muted">حسابك مرتبط بـ Supabase Auth، والمفضلة وسجل المشاهدة محفوظان في قاعدة بيانات Koon.</p><div className="grid sm:grid-cols-2 gap-3"><div className="bg-black/20 border border-white/5 rounded-xl p-4"><b className="text-koon-cyan">Google</b><p className="text-xs text-koon-muted mt-1">تسجيل الدخول والمصادقة</p></div><div className="bg-black/20 border border-white/5 rounded-xl p-4"><b className="text-koon-lime">Cloud Sync</b><p className="text-xs text-koon-muted mt-1">المكتبة والسجل</p></div></div></section>
    <form action={signOut} className="text-right"><button className="border border-red-400/20 text-red-300 px-4 py-3 rounded-xl text-sm hover:bg-red-400/10">تسجيل الخروج</button></form>
  </div>;
}
