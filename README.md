# Bewust Bestaan - Community Platform

Een Nederlandstalig platform voor rust, veiligheid en menselijke verbinding.

## 🌟 Features

### Core Functionaliteiten
- **Authenticatie**: Email + wachtwoord registratie en login
- **Community Forum**: 4 categorieën met topics en reacties
- **Privéberichten**: 1-op-1 gesprekken tussen gebruikers
- **Content**: Blogs en gratis oefeningen
- **Cursussen**: Premium content met paywall
- **AI Veiligheid**: Automatische scanning op risicovolle content
- **Admin Dashboard**: Moderatie en beheer tools

### Unieke Kenmerken
- 🚫 Geen likes, scores of rankings
- 🔒 Privacy-first (DM toestemming per gebruiker)
- 🤖 AI-assisted moderatie zonder censuur
- 🎨 Kalmerend earth-tone design
- 🇳🇱 Volledig in het Nederlands

## 🚀 Quick Start

### Vereisten
- Node.js 18+
- PostgreSQL database
- npm of yarn

### Installatie

1. **Clone en installeer**
```bash
cd bewust-bestaan-platform
npm install
```

2. **Environment variabelen**
```bash
cp .env.example .env
```

Vul je `.env` bestand in:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/bewust_bestaan"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="jouw-geheime-sleutel-minimaal-32-karakters"
```

3. **Database setup**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

4. **Start development server**
```bash
npm run dev
```

Bezoek [http://localhost:3000](http://localhost:3000)

## 👤 Demo Accounts

Na seeding zijn deze accounts beschikbaar:

**Admin:**
- Email: `admin@bewustbestaan.nl`
- Wachtwoord: `admin123`

**Leden:**
- Email: `sophie@example.nl` / Wachtwoord: `member123`
- Email: `lucas@example.nl` / Wachtwoord: `member123`
- Email: `emma@example.nl` / Wachtwoord: `member123`

## 📁 Project Structuur

```
bewust-bestaan-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── community/         # Forum pagina's
│   ├── messages/          # Privéberichten
│   ├── blogs/             # Blog content
│   ├── oefeningen/        # Oefeningen
│   ├── cursus/            # Cursus (paywall)
│   ├── profile/           # Gebruikersprofiel
│   ├── admin/             # Admin dashboard
│   └── ...                # Overige pagina's
├── components/            # React componenten
├── lib/                   # Utilities
├── prisma/               # Database schema
└── types/                # TypeScript types
```

## 🗄️ Database Schema

### Tabellen
- **User**: Authenticatie en rollen
- **Profile**: Publieke gebruikersinformatie
- **Category**: Forum categorieën
- **Topic**: Forum topics
- **TopicReply**: Reacties op topics
- **DmThread**: Privébericht threads
- **DmMessage**: Berichten in threads
- **BlogPost**: Blog artikelen
- **Exercise**: Oefeningen
- **Course**: Cursussen
- **CourseModule**: Cursus modules
- **Entitlement**: Toegangsrechten
- **SafetyAlert**: Veiligheidsalerts

## 🛡️ Veiligheid

### AI Safety Scanner
- Scant automatisch alle content (topics, reacties, DMs)
- Risico niveaus: LAAG, MIDDEL, HOOG
- Creëert alerts voor MIDDEL en HOOG risico
- Blokkeert of censureert NIET automatisch
- Admin krijgt notificaties

### Privacy Features
- DM toestemming kan per gebruiker uitgeschakeld worden
- Geen publieke like counts of scores
- Veilige, oordeelvrije ruimte

## 🎨 Design Systeem

### Kleuren
- **Sand**: Primaire achtergrond (beige/zand tinten)
- **Terracotta**: Accent kleur voor acties
- **Sage**: Secundaire kleur (zachte groentinten)

### Componenten
- `card`: Afgeronde cards met schaduw
- `btn-primary`: Terracotta knoppen
- `btn-secondary`: Sage knoppen
- `input-field`: Invoervelden met focus states

## 🚀 Deployment

### Vercel (Aanbevolen)

1. **Push naar GitHub**
2. **Importeer in Vercel**
3. **Configureer environment variables**
4. **Deploy!**

### Environment Variables (Production)
```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://jouw-domein.nl"
NEXTAUTH_SECRET="sterke-geheime-sleutel"
RESEND_API_KEY="re_..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

## 📋 Scripts

```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run db:push      # Database schema updaten
npm run db:seed      # Voorbeelddata toevoegen
npm run db:studio    # Prisma Studio openen
```

## 🤝 Community Richtlijnen

### Wat we wel doen ✅
- Wees respectvol
- Luister met aandacht
- Deel je ervaring
- Respecteer privacy

### Wat we niet doen ❌
- Oordelen of veroordelen
- Ongevraagd advies geven
- Negatieve competitie
- Promotionele content

## 🆘 Crisis Hulplijnen

- **113 Zelfmoordpreventie**: 0800-0113 (24/7)
- **De Luisterlijn**: 088-0767000 (24/7)
- **Huisarts**: Neem contact op met je eigen huisarts

## 📝 Licentie

Proprietary - Bewust Bestaan © 2025

---

Gebouwd met ❤️ voor menselijke verbinding en bewuste groei.
