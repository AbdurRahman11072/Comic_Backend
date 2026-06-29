import { prisma } from './src/lib/prisma';

async function main() {
  const soloLeveling = await prisma.series.upsert({
    where: { slug: 'solo-leveling' },
    update: {
      coverUrl: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Solo_Leveling_Webtoon_Volume_1_Cover.jpg/440px-Solo_Leveling_Webtoon_Volume_1_Cover.jpg',
    },
    create: {
      title: 'Solo Leveling',
      slug: 'solo-leveling',
      altTitles: 'Only I Level Up, Ore dake Level Up na Ken',
      description: '10 years ago, after "the Gate" that connected the real world with the monster world opened, some of the ordinary, everyday people received the power to hunt monsters within the Gate. They are known as "Hunters". However, not all Hunters are powerful. My name is Sung Jin-Woo, an E-rank Hunter. I\'m someone who has to risk his life in the lowliest of dungeons, the "World\'s Weakest". Having no skills whatsoever to display, I barely earned the required money by fighting in low-leveled dungeons… at least until I found a hidden dungeon with the hardest difficulty within the D-rank dungeons! In the end, as I was accepting death, I suddenly received a strange power, a quest log that only I could see, a secret to leveling up that only I know about! If I trained in accordance with my quests and hunted monsters, my level would rise. Changing from the weakest Hunter to the strongest S-rank Hunter!',
      coverUrl: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/thumb/c/ca/Solo_Leveling_Webtoon_Volume_1_Cover.jpg/440px-Solo_Leveling_Webtoon_Volume_1_Cover.jpg',
      type: 'MANHWA',
      status: 'COMPLETED',
      rating: 4.9,
      genres: {
        connectOrCreate: [
          { where: { name: 'Action' }, create: { name: 'Action' } },
          { where: { name: 'Adventure' }, create: { name: 'Adventure' } },
          { where: { name: 'Fantasy' }, create: { name: 'Fantasy' } },
          { where: { name: 'Shounen' }, create: { name: 'Shounen' } },
        ]
      }
    },
  });

  const tbate = await prisma.series.upsert({
    where: { slug: 'the-beginning-after-the-end' },
    update: {
      coverUrl: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/a2/The_Beginning_After_The_End_web_comic_cover.jpg',
    },
    create: {
      title: 'The Beginning After The End',
      slug: 'the-beginning-after-the-end',
      altTitles: 'TBATE',
      description: 'King Grey has unrivaled strength, wealth, and prestige in a world governed by martial ability. However, solitude lingers closely behind those with great power. Beneath the glamorous exterior of a powerful king lurks the shell of man, devoid of purpose and will. Reincarnated into a new world filled with magic and monsters, the king has a second chance to relive his life. Correcting the mistakes of his past will not be his only challenge, however. Underneath the peace and prosperity of the new world is an undercurrent threatening to destroy everything he has worked for, questioning his role and reason for being born again.',
      coverUrl: 'https://wsrv.nl/?url=https://upload.wikimedia.org/wikipedia/en/a/a2/The_Beginning_After_The_End_web_comic_cover.jpg',
      type: 'MANHWA',
      status: 'ONGOING',
      rating: 4.8,
      genres: {
        connectOrCreate: [
          { where: { name: 'Action' }, create: { name: 'Action' } },
          { where: { name: 'Adventure' }, create: { name: 'Adventure' } },
          { where: { name: 'Fantasy' }, create: { name: 'Fantasy' } },
        ]
      }
    },
  });

  console.log('Seed data updated with Wikipedia images:', soloLeveling.title, ',', tbate.title);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
