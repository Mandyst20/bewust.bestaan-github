# Bewust Bestaan - Project Samenvatting

## 📊 Platform Overzicht

Een volledig functioneel, productie-klare community platform gebouwd met Next.js 14, 
Prisma, PostgreSQL en NextAuth. Volledig in het Nederlands.

### Statistieken
- **56 bestanden** - Componenten, pagina's, API routes en utilities
- **39 directories** - Goed georganiseerde project structuur
- **13 database tabellen** - Compleet datamodel
- **100% Nederlands** - Alle tekst en UI elementen

---

## 🏗️ Architectuur

### Tech Stack
| Component | Technologie |
|-----------|-------------|
| Framework | Next.js 14 (App Router) |
| Taal | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | NextAuth.js |
| Validatie | Zod |
| Utilities | date-fns, clsx, tailwind-merge |

### Database Schema
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    User     │────▶│   Profile   │     │  Category   │
└─────────────┘     └─────────────┘     └──────┬──────┘
       │                                        │
       ▼                                        ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Topic    │◀────│ TopicReply  │     │    Blog     │
└─────────────┘     └─────────────┘     └─────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  DmThread   │◀────│  DmMessage  │     │  Exercise   │
└─────────────┘     └─────────────┘     └─────────────┘

┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    Course   │◀────│CourseModule │     │ Entitlement │
└─────────────┘     └─────────────┘     └─────────────┘

┌─────────────┐
│ SafetyAlert │
└─────────────┘
```

---

## 📁 Project Structuur

```
bewust-bestaan-platform/
├── app/                          # Next.js App Router
│   ├── (pages)/
│   │   ├── page.tsx             # Landing page
│   │   ├── layout.tsx           # Root layout
│   │   ├── globals.css          # Global styles
│   │   ├── login/page.tsx       # Login
│   │   ├── register/page.tsx    # Registratie
│   │   ├── profile/page.tsx     # Eigen profiel
│   │   ├── richtlijnen/page.tsx # Community richtlijnen
│   │   ├──
│   │   ├── community/           # Forum
│   │   │   ├── page.tsx         # Overzicht categorieën
│   │   │   ├── new/page.tsx     # Nieuw topic
│   │   │   ├── topic-detail/    # Topic detail
│   │   │   └── category-detail/ # Categorie detail
│   │   ├──
│   │   ├── messages/            # Privéberichten
│   │   │   ├── page.tsx         # Inbox
│   │   │   └── [threadId]/      # Gesprek
│   │   ├──
│   │   ├── blogs/               # Blog content
│   │   │   ├── page.tsx         # Overzicht
│   │   │   └── [slug]/          # Artikel
│   │   ├──
│   │   ├── oefeningen/          # Oefeningen
│   │   │   ├── page.tsx         # Overzicht
│   │   │   └── [slug]/          # Oefening detail
│   │   ├──
│   │   ├── cursus/              # Premium cursus
│   │   │   └── page.tsx         # Cursus pagina
│   │   ├──
│   │   ├── u/[username]/        # Publiek profiel
│   │   └──
│   │   └── admin/               # Admin dashboard
│   │       ├── page.tsx         # Overzicht
│   │       └── alerts/page.tsx  # Veiligheidsalerts
│   │
│   └── api/                     # API Routes
│       ├── auth/[...nextauth]/  # NextAuth
│       ├── register/route.ts    # Registratie
│       ├── profile/route.ts     # Profiel update
│       ├── topics/route.ts      # Topics CRUD
│       ├── topics/topic-by-id/  # Topic details + replies
│       ├── messages/start/      # DM starten
│       ├── messages/thread-by-id/ # DM berichten
│       └── admin/alerts/        # Admin alerts
│
├── components/                  # React Componenten
│   ├── Navigation.tsx           # Navigatie
│   ├── AuthProvider.tsx         # Auth context
│   ├── NewTopicForm.tsx         # Topic formulier
│   ├── ReplyForm.tsx            # Reactie formulier
│   ├── ReplyCard.tsx            # Reactie kaart
│   ├── ChatInterface.tsx        # Chat UI
│   ├── ProfileForm.tsx          # Profiel formulier
│   ├── StartDMButton.tsx        # DM knop
│   └── AlertCard.tsx            # Alert kaart
│
├── lib/                         # Utilities
│   ├── auth.ts                  # NextAuth config
│   ├── prisma.ts                # Database client
│   ├── safety.ts                # AI safety scanner
│   └── utils.ts                 # Helper functies
│
├── prisma/
│   ├── schema.prisma            # Database schema
│   └── seed.ts                  # Voorbeelddata
│
├── types/                       # TypeScript types
│   ├── next-auth.d.ts           # Auth types
│   └── index.ts                 # App types
│
└── Config files
    ├── package.json
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── next.config.js
    ├── postcss.config.js
    └── .env.example
```

---

## ✨ Features

### Authenticatie & Gebruikers
- [x] Email + wachtwoord registratie
- [x] Login/logout met NextAuth
- [x] Rol systeem (LID / BEHEERDER)
- [x] Profiel met username, bio, avatar
- [x] DM privacy instelling

### Community Forum
- [x] 4 categorieën met iconen
- [x] Topic creatie met tags
- [x] Reacties op topics
- [x] Chronologische volgorde
- [x] Topic status (open/gesloten)

### Privéberichten
- [x] 1-op-1 gesprekken
- [x] Real-time updates (polling)
- [x] DM toestemming check
- [x] Berichten geschiedenis

### Content
- [x] Blog artikelen
- [x] Oefeningen met audio
- [x] Premium cursus met modules
- [x] Entitlement systeem

### Veiligheid
- [x] AI content scanning
- [x] Risico niveaus (laag/middel/hoog)
- [x] Admin alerts dashboard
- [x] Non-blocking moderatie

### Admin
- [x] Dashboard met statistieken
- [x] Safety alerts beheer
- [x] Gebruikers overzicht
- [x] Content moderatie

---

## 🎨 Design Systeem

### Kleuren
```css
Sand:    #fdfcfb → #4d4233 (warm beige)
Terracotta: #fdf6f4 → #6a2d1e (aarde oranje)
Sage:    #f7f9f7 → #2a362a (zacht groen)
```

### Componenten
- `.card` - Witte achtergrond, afgeronde hoeken, schaduw
- `.btn-primary` - Terracotta achtergrond
- `.btn-secondary` - Sage achtergrond
- `.input-field` - Wit met focus ring
- `.badge` - Tags en labels

---

## 🚀 Deployment

### Vereisten
- Node.js 18+
- PostgreSQL database
- Vercel account (aanbevolen)

### Stappen
1. `npm install`
2. Configureer `.env`
3. `npx prisma db push`
4. `npm run db:seed`
5. `npm run dev` (lokaal) of deploy naar Vercel

### Demo Accounts
```
Admin:  admin@bewustbestaan.nl / admin123
Sophie: sophie@example.nl / member123
Lucas:  lucas@example.nl / member123
Emma:   emma@example.nl / member123
```

---

## 🛡️ Veiligheidsfeatures

### AI Safety Scanner
- Scant alle content automatisch
- Keywords voor risico detectie
- Alerts voor MIDDEL en HOOG risico
- Geen automatische censuur

### Privacy
- DM toestemming per gebruiker
- Geen publieke scores of likes
- Veilige, oordeelvrije ruimte

---

## 📝 Belangrijke Bestanden

| Bestand | Doel |
|---------|------|
| `prisma/schema.prisma` | Database structuur |
| `prisma/seed.ts` | Voorbeelddata |
| `lib/auth.ts` | Authenticatie config |
| `lib/safety.ts` | AI scanning logica |
| `app/layout.tsx` | Root layout |
| `app/page.tsx` | Landing page |

---

## 🎯 Volgende Stappen (Optioneel)

### Week 2-3
- [ ] Email notificaties (Resend)
- [ ] Wachtwoord reset
- [ ] Avatar upload
- [ ] Zoekfunctionaliteit

### Week 4-6
- [ ] Real-time WebSocket
- [ ] Stemmen in DMs
- [ ] Cursus voortgang
- [ ] Badges/achievements

### Maand 2+
- [ ] Stripe betalingen
- [ ] Mobiele app (React Native)
- [ ] Mentor matching
- [ ] Community events

---

## 📄 Licentie

Proprietary - Bewust Bestaan © 2025

---

**Klaar voor deployment! 🚀**

Dit platform is volledig functioneel en klaar om live te gaan.
Volg de instructies in `DEPLOY.md` om te deployen naar Vercel.
