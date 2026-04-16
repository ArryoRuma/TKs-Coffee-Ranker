import { PrismaClient, Visibility } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const tk = await prisma.user.upsert({
    where: { email: "tk@example.com" },
    update: {},
    create: {
      email: "tk@example.com",
      username: "tkruma",
      displayName: "TK Ruma",
      bio: "Logging flavor memories one cup at a time.",
      homeCity: "Jakarta",
      favoriteDrink: "Honey Oat Flat White",
    },
  });

  const aria = await prisma.user.upsert({
    where: { email: "aria@example.com" },
    update: {},
    create: {
      email: "aria@example.com",
      username: "aria.beans",
      displayName: "Aria Putri",
      bio: "Weekend pour-over chaser.",
      homeCity: "Bandung",
      favoriteDrink: "Kenyan V60",
    },
  });

  const morningChapter = await prisma.cafe.upsert({
    where: { id: "cafe-morning-chapter" },
    update: {},
    create: {
      id: "cafe-morning-chapter",
      name: "Morning Chapter",
      city: "Jakarta",
      country: "Indonesia",
    },
  });

  const duaCoffee = await prisma.cafe.upsert({
    where: { id: "cafe-dua" },
    update: {},
    create: {
      id: "cafe-dua",
      name: "Dua Coffee",
      city: "Jakarta",
      country: "Indonesia",
    },
  });

  const commonGrounds = await prisma.roaster.upsert({
    where: { id: "roaster-common-grounds" },
    update: {},
    create: { id: "roaster-common-grounds", name: "Common Grounds", country: "Indonesia" },
  });

  const spaceRoastery = await prisma.roaster.upsert({
    where: { id: "roaster-space" },
    update: {},
    create: { id: "roaster-space", name: "Space Roastery", country: "Indonesia" },
  });

  const citrusTag = await prisma.tag.upsert({
    where: { name: "citrus" },
    update: {},
    create: { name: "citrus" },
  });

  const floralTag = await prisma.tag.upsert({
    where: { name: "floral" },
    update: {},
    create: { name: "floral" },
  });

  const honeyEntry = await prisma.coffeeEntry.upsert({
    where: { id: "entry-honey-oat" },
    update: {},
    create: {
      id: "entry-honey-oat",
      userId: tk.id,
      title: "Honey Oat Flat White",
      drinkType: "Flat White",
      cafeId: morningChapter.id,
      roasterId: commonGrounds.id,
      origin: "Ethiopia Yirgacheffe",
      roastLevel: "Light-Medium",
      brewMethod: "Espresso",
      tastingNotes: ["honey", "orange blossom", "silky"],
      rating: 9,
      reviewBody: "Creamy texture with bright citrus and floral finish.",
      dateConsumed: new Date("2026-04-13"),
      location: "Jakarta",
      wouldOrderAgain: true,
      favorite: true,
      visibility: Visibility.PUBLIC,
      tags: { connect: [{ id: citrusTag.id }, { id: floralTag.id }] },
    },
  });

  const blueberryEntry = await prisma.coffeeEntry.upsert({
    where: { id: "entry-blueberry-filter" },
    update: {},
    create: {
      id: "entry-blueberry-filter",
      userId: aria.id,
      title: "Blueberry Filter",
      drinkType: "Pour Over",
      cafeId: duaCoffee.id,
      roasterId: spaceRoastery.id,
      origin: "Colombia Huila",
      roastLevel: "Light",
      brewMethod: "V60",
      tastingNotes: ["blueberry", "cane sugar", "tea-like"],
      rating: 8,
      reviewBody: "Juicy cup with soft acidity and tea-like body.",
      dateConsumed: new Date("2026-04-08"),
      location: "Jakarta",
      wouldOrderAgain: true,
      favorite: false,
      visibility: Visibility.FRIENDS,
    },
  });

  await prisma.review.upsert({
    where: { coffeeEntryId: honeyEntry.id },
    update: {},
    create: {
      userId: tk.id,
      coffeeEntryId: honeyEntry.id,
      body: "One of my favorite milk drinks this season.",
    },
  });

  const favoritesList = await prisma.list.upsert({
    where: { id: "list-favorites" },
    update: {},
    create: {
      id: "list-favorites",
      userId: tk.id,
      title: "Favorites",
      description: "Cups I would order again without thinking.",
      isPublic: false,
    },
  });

  await prisma.listItem.upsert({
    where: { id: "list-item-1" },
    update: {},
    create: {
      id: "list-item-1",
      listId: favoritesList.id,
      coffeeEntryId: honeyEntry.id,
      note: "Perfect morning cup.",
    },
  });

  await prisma.listItem.upsert({
    where: { id: "list-item-2" },
    update: {},
    create: {
      id: "list-item-2",
      listId: favoritesList.id,
      coffeeEntryId: blueberryEntry.id,
      note: "Still dial-in potential.",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
