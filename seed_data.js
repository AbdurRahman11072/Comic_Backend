import { prisma } from './src/lib/prisma.js';

const SERIES_SAMPLES = [
  {
    title: "The Sword Emperor Reincarnated",
    description: "The House of Cardenas, the legendary swordsmen sworn to protect the Arcadia Empire, is renowned as a formidable military powerhouse.",
    type: "MANHWA",
    status: "ONGOING",
    coverUrl: "https://wsrv.nl/?url=https%3A%2F%2Fstorage.vortexscans.org%2Fupload%2Fseries%2Ffeatured%2F751%2F32f834a2-2c1c-4358-b13a-555b87890bd9.png&w=640&q=90",
    bgUrl: "https://wsrv.nl/?url=https%3A%2F%2Fstorage.vortexscans.org%2Fupload%2Fseries%2Ffeatured%2F751%2F32f834a2-2c1c-4358-b13a-555b87890bd9.png&w=1920&q=70",
    genres: ["Action", "Fantasy", "Martial Arts"],
    isPinned: true
  },
  {
    title: "Solo Leveling: Ragnarok",
    description: "The successor to the world-renowned Solo Leveling. Sung Su-ho's journey begins now.",
    type: "MANHWA",
    status: "ONGOING",
    coverUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/WmGZLGSLSPd&w=640",
    bgUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/WmGZLGSLSPd&w=1920",
    genres: ["Action", "Adventure", "Fantasy"],
    isPinned: true
  },
  {
    title: "The Return of the Ranker",
    description: "I was the strongest. Then I was betrayed. Now I am back for revenge.",
    type: "MANHWA",
    status: "ONGOING",
    coverUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/4Ku3Rzm_1MJ&w=640",
    bgUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/4Ku3Rzm_1MJ&w=1920",
    genres: ["Action", "Fantasy"],
    isPinned: false
  },
  {
    title: "Married Man in Another World",
    description: "What happens when a normal man gets married in a world of magic?",
    type: "MANHWA",
    status: "ONGOING",
    coverUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/F7TQ0vd9Fj2&w=640",
    bgUrl: "https://wsrv.nl/?url=cdn.meowing.org/uploads/F7TQ0vd9Fj2&w=1920",
    genres: ["Comedy", "Romance", "Fantasy"],
    isPinned: false
  }
];

async function main() {
  console.log('Seeding data...');
  
  for (const s of SERIES_SAMPLES) {
    const { genres, ...seriesData } = s;
    
    // Generate slug
    const slug = seriesData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const series = await prisma.series.upsert({
      where: { slug },
      update: {},
      create: {
        ...seriesData,
        slug,
        genres: {
          connectOrCreate: genres.map(name => ({
            where: { name },
            create: { name }
          }))
        }
      }
    });
    
    console.log(`Created/Updated series: ${series.title}`);
    
    // Add some chapters
    for (let i = 1; i <= 5; i++) {
      const chapterSlug = `${series.id}-${i}`;
      await prisma.chapter.upsert({
        where: { id: chapterSlug }, // Using slug as ID for simple seeding
        update: {},
        create: {
          id: chapterSlug,
          seriesId: series.id,
          number: i,
          title: `Chapter ${i}`,
          isLocked: i > 3,
          coinCost: i > 3 ? 3 : 0,
        }
      });
    }
  }
  
  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
