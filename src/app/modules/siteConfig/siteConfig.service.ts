import { prisma } from '../../../lib/prisma';

const getConfig = async () => {
  let config = await prisma.siteConfig.findUnique({
    where: { id: 'global' },
  });

  if (!config) {
    config = await prisma.siteConfig.create({
      data: {
        id: 'global',
        announceText: 'Welcome to Genz Toon! Enjoy our latest manhwa and manga collection.',
        announceLink: '/series',
        socialLinks: [
          { platform: 'Discord', url: 'https://discord.gg', icon: 'discord' },
          { platform: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        ] as any,
      },
    });
  }

  return config;
};

const updateConfig = async (data: any) => {
  return await prisma.siteConfig.upsert({
    where: { id: 'global' },
    update: data,
    create: {
      id: 'global',
      ...data,
    },
  });
};

export const SiteConfigService = {
  getConfig,
  updateConfig,
};
