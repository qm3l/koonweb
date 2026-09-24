# Koon Web

Koon is a real Next.js 14 anime web application backed by Supabase Auth/Postgres/Storage and AniList metadata. It is designed for production deployment, not a demo: there are no fallback demo streams or fake catalog records.

## Stack
- Next.js 14 App Router + TypeScript
- Supabase Auth / PostgreSQL / RLS / Storage
- Google OAuth through Supabase Auth
- AniList for per-work anime metadata and posters
- HLS.js for HLS playback and native MP4 playback

## 1. Install locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Then open `http://localhost:3000`.

Required `.env.local` values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Never commit `.env.local`. Next.js recommends keeping environment files out of source control. Public browser variables must use the `NEXT_PUBLIC_` prefix. 

## 2. Supabase — one-time setup

In Supabase SQL Editor, run:

`supabase/migrations/001_koon.sql`

This creates the Koon tables, RLS policies, staff authorization function and `koon-media` Storage bucket.

After signing in once with Google, find the user's UUID in `auth.users`, then run:

```sql
update public.profiles
set role = 'admin'
where id = 'YOUR_AUTH_USER_UUID';
```

Google OAuth remains managed by Supabase Auth. Keep the Google Cloud OAuth client connected to the Supabase provider and add the callback URL shown by Supabase to the Google OAuth client.

## 3. Content flow

1. Admin searches AniList and imports a work.
2. Koon keeps the work poster/metadata from AniList; you do not need to upload every poster.
3. Admin uploads Koon banners to Media; banner records are selected from that library on Homepage.
4. Admin creates real episodes and real HLS/MP4 sources.
5. Users see only enabled database records.
6. Favorites and watch progress are stored per authenticated user.

## 4. Production checks before launch

```bash
npm run lint
npm run build
npm run start
```

Do not launch if the build fails. Also test: Google login, logout, favorite, watch progress, source switching, an unavailable source, admin protection, banner upload, episode creation, and mobile layout.

## 5. GitHub

Create an empty GitHub repository, then from the project root:

```bash
git init
git add .
git commit -m "Koon production release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

`.env.local` must remain untracked.

## 6. Vercel

Import the GitHub repository into Vercel. Vercel automatically detects Next.js. Add these Production environment variables in Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SITE_URL=https://YOUR-DOMAIN.vercel.app
```

Deploy. Git-connected Vercel projects can automatically deploy new commits and provide preview deployments.

## 7. Supabase / Google callback after Vercel deployment

After you know the final Vercel URL, update the Supabase Auth URL configuration and Google OAuth authorized redirect settings with the production callback URL supplied by Supabase. Also set the production site URL to the Vercel/custom-domain URL.

## 8. Final launch order

1. Supabase migration
2. Google OAuth callback verification
3. Local `npm install`, `npm run lint`, `npm run build`
4. Push `main` to GitHub
5. Import GitHub repo into Vercel
6. Add Vercel environment variables
7. Deploy
8. Recheck Supabase/Google production URLs
9. Promote the real admin account
10. Upload your Koon banners
11. Import anime works
12. Add real episodes/sources
13. Test the complete user journey on phone
14. Open the public URL

### Current limitation of this package
The code was statically reviewed in the build environment, but package installation previously timed out there. Therefore a successful `npm run build` has not been claimed here; your local/Vercel build is the authoritative final runtime check.
