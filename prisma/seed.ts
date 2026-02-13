import { PrismaClient, Role, TopicStatus, AlertType, RiskLevel } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Start seeding...')

  // Clean existing data
  await prisma.safetyAlert.deleteMany()
  await prisma.dmMessage.deleteMany()
  await prisma.dmThread.deleteMany()
  await prisma.topicReply.deleteMany()
  await prisma.topic.deleteMany()
  await prisma.entitlement.deleteMany()
  await prisma.courseModule.deleteMany()
  await prisma.course.deleteMany()
  await prisma.exercise.deleteMany()
  await prisma.blogPost.deleteMany()
  await prisma.category.deleteMany()
  await prisma.profile.deleteMany()
  await prisma.user.deleteMany()

  console.log('🧹 Cleaned existing data')

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        slug: 'emoties-innerlijke-onrust',
        name: 'Emoties & Innerlijke Onrust',
        description: 'Deel je gevoelens, angsten en innerlijke strijd in een veilige omgeving',
        icon: '💭',
        order: 1,
      },
    }),
    prisma.category.create({
      data: {
        slug: 'grenzen-relaties',
        name: 'Grenzen & Relaties',
        description: 'Over relaties, grenzen stellen en gezonde verbindingen',
        icon: '🤝',
        order: 2,
      },
    }),
    prisma.category.create({
      data: {
        slug: 'zelfbeeld',
        name: 'Zelfbeeld',
        description: 'Zelfacceptatie, zelfliefde en persoonlijke groei',
        icon: '🪞',
        order: 3,
      },
    }),
    prisma.category.create({
      data: {
        slug: 'zingeving',
        name: 'Zingeving',
        description: 'Levensvragen, spiritualiteit en het vinden van betekenis',
        icon: '✨',
        order: 4,
      },
    }),
  ])

  console.log('✅ Created categories')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@bewustbestaan.nl',
      passwordHash: adminPassword,
      role: Role.ADMIN,
      emailVerified: true,
      profile: {
        create: {
          username: 'admin',
          bio: 'Beheerder van Bewust Bestaan. Hier om te helpen en te ondersteunen.',
          allowDm: true,
        },
      },
    },
  })

  // Create member users
  const memberPassword = await bcrypt.hash('member123', 10)
  
  const sophie = await prisma.user.create({
    data: {
      email: 'sophie@example.nl',
      passwordHash: memberPassword,
      role: Role.MEMBER,
      emailVerified: true,
      profile: {
        create: {
          username: 'sophie',
          bio: 'Hoi! Ik ben Sophie en ik ben op zoek naar meer rust in mijn leven.',
          allowDm: true,
        },
      },
    },
  })

  const lucas = await prisma.user.create({
    data: {
      email: 'lucas@example.nl',
      passwordHash: memberPassword,
      role: Role.MEMBER,
      emailVerified: true,
      profile: {
        create: {
          username: 'lucas',
          bio: 'Lucas hier. Ik probeer elke dag een beetje meer bewust te leven.',
          allowDm: true,
        },
      },
    },
  })

  const emma = await prisma.user.create({
    data: {
      email: 'emma@example.nl',
      passwordHash: memberPassword,
      role: Role.MEMBER,
      emailVerified: true,
      profile: {
        create: {
          username: 'emma_v',
          bio: 'Moeder van 2, op zoek naar balans tussen gezin en mezelf.',
          allowDm: false,
        },
      },
    },
  })

  console.log('✅ Created users')

  // Create sample topics
  const topic1 = await prisma.topic.create({
    data: {
      categoryId: categories[0].id,
      title: 'Hoe gaan jullie om met overprikkeling?',
      body: `De laatste tijd voel ik me constant overprikkeld. Alles lijkt te veel - werk, sociale verplichtingen, zelfs het nieuws lezen voelt als een last.

Ik ben benieuwd hoe anderen hier mee omgaan. Wat helpt voor jullie om weer tot rust te komen?

Voor mij helpt wandelen in de natuur, maar soms heb ik niet eens de energie om de deur uit te gaan...`,
      tags: ['overprikkeling', 'rust', 'hoogsensitief'],
      authorId: sophie.id,
      status: TopicStatus.OPEN,
    },
  })

  const topic2 = await prisma.topic.create({
    data: {
      categoryId: categories[1].id,
      title: 'Grenzen stellen zonder schuldgevoel',
      body: `Ik heb altijd moeite gehad met grenzen stellen. Het voelt alsof ik anderen teleurstel als ik "nee" zeg.

Onlangs heb ik voor het eerst echt een grens gesteld bij een vriendin die steeds laat op de avond belde. Het voelde goed, maar ook eng.

Hoe doen jullie dit? En hoe gaan jullie om met het schuldgevoel dat soms komt opzetten?`,
      tags: ['grenzen', 'relaties', 'schuldgevoel'],
      authorId: lucas.id,
      status: TopicStatus.OPEN,
    },
  })

  const topic3 = await prisma.topic.create({
    data: {
      categoryId: categories[2].id,
      title: 'De reis naar zelfacceptatie',
      body: `Vandaag wil ik delen dat ik eindig ben begonnen met die reis naar zelfacceptatie. Het is niet makkelijk, maar het voelt als een bevrijding.

Jarenlang heb ik geprobeerd te voldoen aan het beeld dat anderen van mij hadden. Nu begin ik te ontdekken wie IK ben, wat IK wil.

Is er iemand die soortgelijke ervaringen heeft? Ik zou graag van jullie horen.`,
      tags: ['zelfacceptatie', 'persoonlijke-groei', 'zelfliefde'],
      authorId: emma.id,
      status: TopicStatus.OPEN,
    },
  })

  console.log('✅ Created topics')

  // Create replies
  await prisma.topicReply.create({
    data: {
      topicId: topic1.id,
      authorId: lucas.id,
      body: `Hey Sophie, herkenbaar! Voor mij helpt het om kleine "rustmomenten" in te plannen gedurende de dag. Zelfs 5 minuten bewust ademhalen kan al verschil maken.

Ook heb ik geleerd dat het oké is om nee te zeggen tegen dingen die me energie kosten. Dat voelt in het begin onwennig, maar wordt makkelijker.`,
    },
  })

  await prisma.topicReply.create({
    data: {
      topicId: topic1.id,
      authorId: emma.id,
      body: `Wat herkenbaar, Sophie! Als moeder voel ik die overprikkeling soms ook intens. Wat voor mij helpt is: earplugs (ook als het stil is, het dempt alles een beetje), en een warme kop kamillethee.

Je bent niet alleen in dit. ❤️`,
    },
  })

  await prisma.topicReply.create({
    data: {
      topicId: topic2.id,
      authorId: sophie.id,
      body: `Lucas, goed dat je die grens hebt gesteld! Ik herken dat schuldgevoel. Wat mij helpt is mezelf eraan herinneren dat grenzen juist de relatie gezonder maken op de lange termijn.

Een vriendin zei eens tegen me: "Nee zeggen tegen iemand anders is ja zeggen tegen jezelf." Die zin is me bijgebleven.`,
    },
  })

  console.log('✅ Created replies')

  // Create blog posts
  await prisma.blogPost.create({
    data: {
      slug: 'wat-is-bewust-bestaan',
      title: 'Wat is Bewust Bestaan?',
      excerpt: 'Een introductie in het bewust leven en wat het voor jou kan betekenen.',
      body: `# Wat is Bewust Bestaan?

Bewust bestaan is de kunst van het aandachtig leven. Het betekent:

## Aanwezig zijn
Niet meer automatisch piloot zijn, maar bewust keuzes maken in je dagelijks leven.

## Accepteren wat is
Niet vechten tegen de realiteit, maar er vredig mee omgaan.

## Verbinding maken
Met jezelf, met anderen, met het moment.

## Begin vandaag
Je hoeft niet te wachten tot "het juiste moment". Elke ademhaling is een nieuwe kans om bewust te zijn.

Welkom op deze reis. Je bent niet alleen.`,
      published: true,
      featured: true,
      readTime: 3,
    },
  })

  await prisma.blogPost.create({
    data: {
      slug: 'de-kracht-van-zacht-zijn',
      title: 'De Kracht van Zacht Zijn',
      excerpt: 'In een wereld die hard en snel is, is zachtheid een radicale keuze.',
      body: `# De Kracht van Zacht Zijn

We leven in een wereld die ons voortdurend vertelt dat we harder moeten werken, sneller moeten gaan, meer moeten presteren.

Maar wat als de weg naar binnen juist de weg naar voren is?

## Zachtheid is geen zwakte

Zachtheid vraagt moed. Het vraagt om kwetsbaar te zijn in een wereld die dat niet altijd beloont.

## Wat is zacht zijn?

- Jezelf toestaan om te voelen
- Grenzen stellen met liefde
- Tijd nemen voor rust
- Nee zeggen zonder schuldgevoel

## Oefening

Vandaag, probeer één moment te vinden waarop je zacht kunt zijn voor jezelf. Een diepe ademhaling. Een moment van stilte.

Je verdient het.`,
      published: true,
      featured: false,
      readTime: 4,
    },
  })

  await prisma.blogPost.create({
    data: {
      slug: 'omgaan-met-eenzaamheid',
      title: 'Omgaan met Eenzaamheid',
      excerpt: 'Eenzaamheid is een universeel menselijk gevoel. Hoe kunnen we er vriendelijker mee omgaan?',
      body: `# Omgaan met Eenzaamheid

Eenzaamheid is iets wat we allemaal wel eens ervaren. Het is niets om je voor te schamen.

## Eerst: erkennen

Het begint met eerlijk zijn naar jezelf. "Ik voel me eenzaam." Dat is oké.

## Dan: verzachten

Probeer niet meteen van het gevoel af te willen. Vraag jezelf af: wat heb ik nu nodig?

## Verbinding zoeken

Soms is dat contact met anderen. Soms is dat verbinding met jezelf.

## Je bent niet alleen

Ook al voelt het zo. Er zijn anderen die hetzelfde voelen. Deze community is hier om dat samen te dragen.

**Crisis hulplijn: Bel 113 als je er echt alleen voor staat.**`,
      published: true,
      featured: true,
      readTime: 5,
    },
  })

  console.log('✅ Created blog posts')

  // Create exercises
  await prisma.exercise.create({
    data: {
      slug: 'ademruimte',
      title: 'Ademruimte',
      description: 'Een korte ademhalingsoefening voor momenten van spanning of onrust.',
      body: `# Ademruimte

Deze oefening duurt 3 minuten en kan overal gedaan worden.

## Stappen

1. **Ga zitten** - Vind een comfortabele houding, voeten op de grond

2. **Sluit je ogen** - Of kijk zachtjes naar beneden

3. **Adem in** - Tel tot 4
   - 1... 2... 3... 4...

4. **Houd vast** - Tel tot 4
   - 1... 2... 3... 4...

5. **Adem uit** - Tel tot 6
   - 1... 2... 3... 4... 5... 6...

6. **Herhaal** - 5 keer

## Terugkomen

Wanneer je klaar bent, beweeg zachtjes je vingertjes en tenen. Open je ogen als je er klaar voor bent.

Je hebt dit gedaan. Goed zo.`,
      icon: '🫁',
      duration: 3,
      published: true,
    },
  })

  await prisma.exercise.create({
    data: {
      slug: 'bodyscan',
      title: 'Zachte Bodyscan',
      description: 'Een lichaamsoefening om contact te maken met wat je voelt.',
      body: `# Zachte Bodyscan

Deze oefening helpt je om contact te maken met je lichaam.

## Stappen

1. **Lig neer** - Op een comfortabele plek

2. **Voeten** - Richt je aandacht op je voeten
   - Wat voel je daar? Warmte? Druk? Niets is fout.

3. **Benen** - Laat je aandacht langzaam omhoog gaan
   - Kuiten, knieën, bovenbenen

4. **Buik en borst** - Merk op hoe je ademhaling voelt

5. **Armen en handen** - Van schouders naar vingertoppen

6. **Hoofd** - Laat je aandacht rusten bij je gezicht

## Afronden

Neem een diepe ademhaling. Beweg zachtjes als je er klaar voor bent.

Je hebt tijd genomen voor jezelf. Dat is waardevol.`,
      icon: '🧘',
      duration: 10,
      published: true,
    },
  })

  await prisma.exercise.create({
    data: {
      slug: 'dankbaarheid',
      title: 'Moment van Dankbaarheid',
      description: 'Een eenvoudige oefening om het goede in je leven te zien.',
      body: `# Moment van Dankbaarheid

Soms is het moeilijk om het goede te zien. Deze oefening helpt je om kleine momenten van licht te vinden.

## Stappen

1. **Adem diep in** - En uit

2. **Vraag jezelf af**: Wat is er vandaag één ding dat ik waardeer?
   - Het kan klein zijn: een warme kop koffie, zonlicht, een vriendelijk woord

3. **Voel het** - Laat dat gevoel even bezinken

4. **Schrijf het op** (optioneel) - Noteer het in een journal

## Herinnering

Dankbaarheid is geen ontkenning van het moeilijke. Het is het erkennen van het volledige plaatje.

Je mag trots zijn op jezelf dat je dit doet.`,
      icon: '🙏',
      duration: 5,
      published: true,
    },
  })

  console.log('✅ Created exercises')

  // Create course
  const course = await prisma.course.create({
    data: {
      slug: 'bewust-leven-basis',
      title: 'Bewust Leven - Basis',
      description: `Een 4-weken programma om de basis van bewust leven te leren.

In deze cursus ontdek je:
- Wat bewustzijn werkelijk betekent
- Praktische tools voor dagelijks leven
- Hoe om te gaan met moeilijke emoties
- Het creëren van duurzame gewoontes

Geschikt voor beginners. Geen ervaring nodig.`,
      price: 9900, // €99.00
      published: true,
    },
  })

  await prisma.courseModule.createMany({
    data: [
      {
        courseId: course.id,
        title: 'Week 1: Wat is Bewustzijn?',
        body: `# Week 1: Wat is Bewustzijn?

## In deze module

- De definitie van bewust leven
- Misverstanden over mindfulness
- Je eerste meditatie-oefening
- Huiswerk: 5 minuten per dag

## Video

[Video content hier]

## Oefening

Doe de "Ademruimte" oefening elke dag deze week.

## Reflectie

Schrijf op: Wat merk je op als je even stilstaat?`,
        orderIndex: 1,
        isPreview: true,
        duration: 15,
      },
      {
        courseId: course.id,
        title: 'Week 2: Omgaan met Gedachten',
        body: `# Week 2: Omgaan met Gedachten

## In deze module

- De natuur van gedachten
- Observeren zonder oordelen
- De "wandelende meditatie"
- Huiswerk: Gedachten-journal

## Video

[Video content hier]

## Oefening

Probeer de "wandelende meditatie" 3x deze week.

## Reflectie

Welke gedachten komen het vaakst terug?`,
        orderIndex: 2,
        isPreview: false,
        duration: 20,
      },
      {
        courseId: course.id,
        title: 'Week 3: Emoties Toestaan',
        body: `# Week 3: Emoties Toestaan

## In deze module

- Emoties als signalen
- De R.A.I.N. techniek
- Zelfcompassie oefening
- Huiswerk: Emotie-tracking

## Video

[Video content hier]

## Oefening

Gebruik R.A.I.N. bij een moeilijke emotie deze week.

## Reflectie

Wat gebeurt er als je een emotie toestaat in plaats van wegduwt?`,
        orderIndex: 3,
        isPreview: false,
        duration: 25,
      },
      {
        courseId: course.id,
        title: 'Week 4: Integratie',
        body: `# Week 4: Integratie

## In deze module

- Een persoonlijk plan maken
- Omgaan met tegenslag
- Vervolgstappen
- Afsluiting en viering

## Video

[Video content hier]

## Oefening

Maak je persoonlijke "bewust leven" plan.

## Reflectie

Wat neem je mee uit deze cursus?`,
        orderIndex: 4,
        isPreview: false,
        duration: 30,
      },
    ],
  })

  console.log('✅ Created course')

  // Create sample safety alert
  await prisma.safetyAlert.create({
    data: {
      type: AlertType.TOPIC,
      refId: topic1.id,
      riskLevel: RiskLevel.LOW,
      reason: 'Mentions of feeling overwhelmed and low energy - monitoring for wellbeing',
      content: 'De laatste tijd voel ik me constant overprikkeld...',
    },
  })

  console.log('✅ Created sample safety alert')

  console.log('\n🎉 Seeding completed!')
  console.log('\n📧 Demo accounts:')
  console.log('  Admin: admin@bewustbestaan.nl / admin123')
  console.log('  Member: sophie@example.nl / member123')
  console.log('  Member: lucas@example.nl / member123')
  console.log('  Member: emma@example.nl / member123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
