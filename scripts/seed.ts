// to insert the categories to our database
// import { PrismaClient } from "@prisma/client"; cannot use this as this is a node file

const { PrismaClient } = require("@prisma/client");

const dbPrisma = new PrismaClient();

const main = async () => {
  try {
    await dbPrisma.category.createMany({
      data: [
        { name: "Famous Personalities" },
        { name: "Movies" },
        { name: "Musicians" },
        { name: "Scientists" },
        { name: "CEOs" },
        { name: "Artists" },
        { name: "Singers" },
        { name: "Music Bands" },
        { name: "Anime" },
      ],
    });
  } catch (error) {
    console.log("Error seeding default libraries!");
  } finally {
    await dbPrisma.$disconnect();
  }
};

main();
