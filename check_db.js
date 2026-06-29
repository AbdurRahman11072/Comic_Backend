import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.series.count();
    console.log('Total series:', count);
    const genres = await prisma.genre.findMany();
    console.log('Genres:', genres);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
