import { PrismaClient } from './src/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  try {
    const allSeries = await prisma.series.findMany();
    console.log('All Series:', JSON.stringify(allSeries, null, 2));
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
