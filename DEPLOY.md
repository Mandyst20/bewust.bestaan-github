# Bewust Bestaan - Deployment Guide

## 🚀 Deployment naar Vercel

### Stap 1: Voorbereiding

1. **Maak een GitHub repository aan**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/jouw-username/bewust-bestaan.git
   git push -u origin main
   ```

2. **Maak een Vercel account aan**
   - Ga naar [vercel.com](https://vercel.com)
   - Log in met je GitHub account

### Stap 2: Database Setup

1. **Vercel Postgres (Aanbevolen)**
   - Ga naar je Vercel Dashboard
   - Klik op "Storage"
   - Maak een nieuwe Postgres database aan
   - Kopieer de connection string

2. **Of gebruik Supabase**
   - Maak een Supabase project aan
   - Kopieer de database URL

### Stap 3: Environment Variables

Configureer deze environment variables in Vercel:

```
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://jouw-project.vercel.app"
NEXTAUTH_SECRET="genereer-een-sterke-secret"
```

**NEXTAUTH_SECRET genereren:**
```bash
openssl rand -base64 32
```

### Stap 4: Deploy

1. **Importeer project in Vercel**
   - Klik "Add New Project"
   - Selecteer je GitHub repository
   - Framework preset: Next.js

2. **Configureer build settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`

3. **Klik "Deploy"**

### Stap 5: Database Migrations

Na de eerste deploy:

```bash
# Installeer Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Run migrations
vercel env pull .env.local
npx prisma migrate deploy
```

## 🔧 Post-Deployment Setup

### 1. Seed Database (eenmalig)

```bash
vercel --prod
# Of gebruik de Vercel console
```

### 2. Configureer Custom Domain (optioneel)

1. Ga naar Project Settings → Domains
2. Voeg je domein toe
3. Update DNS records volgens instructies

### 3. Configureer Email (optioneel)

Voor email notificaties:

1. Maak een [Resend](https://resend.com) account aan
2. Verifieer je domein
3. Voeg toe aan environment variables:
   ```
   RESEND_API_KEY="re_..."
   FROM_EMAIL="noreply@jouw-domein.nl"
   ```

### 4. Configureer Stripe (optioneel)

Voor betalingen:

1. Maak een [Stripe](https://stripe.com) account aan
2. Kopieer je API keys
3. Voeg toe aan environment variables:
   ```
   STRIPE_SECRET_KEY="sk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   STRIPE_PRICE_ID="price_..."
   ```

## 🔄 Updates Deployen

```bash
# Maak wijzigingen
git add .
git commit -m "Beschrijving van wijzigingen"
git push

# Vercel deployt automatisch!
```

## 🐛 Troubleshooting

### Build Errors

```bash
# Lokale build testen
npm run build

# Check TypeScript errors
npx tsc --noEmit
```

### Database Errors

```bash
# Reset database (LET OP: verwijdert alle data!)
npx prisma migrate reset

# Of alleen migrations opnieuw toepassen
npx prisma migrate deploy
```

### Environment Variables

```bash
# Pull environment variables
vercel env pull .env.local

# Check of alles correct is
vercel env ls
```

## 📊 Monitoring

1. **Vercel Analytics**
   - Ga naar Analytics tab in Vercel Dashboard
   - Bekijk performance metrics

2. **Logs bekijken**
   ```bash
   vercel logs --json
   ```

## 💰 Kosten

**Vercel Hobby (Gratis):**
- 100GB Bandwidth/maand
- 1000 Build minutes/maand
- Serverless Functions

**Vercel Postgres (Gratis tier):**
- 256MB storage
- 5000 queries/maand

Voor productie met veel gebruikers:
- Vercel Pro: $20/maand
- Postgres Pro: $15/maand

## 📝 Checklist

- [ ] GitHub repository aangemaakt
- [ ] Vercel project aangemaakt
- [ ] Database geconfigureerd
- [ ] Environment variables ingesteld
- [ ] NEXTAUTH_SECRET gegenereerd
- [ ] Database gemigreerd
- [ ] Seed data toegevoegd
- [ ] Custom domain geconfigureerd (optioneel)
- [ ] Email geconfigureerd (optioneel)
- [ ] Stripe geconfigureerd (optioneel)

## 🆘 Support

Bij problemen:
1. Check Vercel logs in dashboard
2. Controleer environment variables
3. Test lokaal met `vercel dev`
4. Raadpleeg [Vercel Docs](https://vercel.com/docs)
