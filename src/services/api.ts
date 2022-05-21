import { prismaClient } from "./database/prismaClient";

export async function createComic() {
  await prismaClient.category.createMany({
    data:[
      {
        name: "marvel",
      },
      {
        name: "dc",
      },
      {
        name: "mauricio",
      },
    ]
  })

  await prismaClient.comic.createMany({
    data: [
      {
        name: "The Flash",
        description: "The Flash is a super-powered super-hero",
        edition: "1",
        year: 2020,
        price: 100,
        categoryName: "dc",
      },
      {
        name: "Spider-Man",
        description: "Nas garras do Homem-Lobo",
        edition: "006",
        year: 2018,
        price: 69.90,
        categoryName: "marvel",
      },
      {
        name: "Superman",
        description: "Superman is a super-powered super-hero",
        edition: "223",
        year: 2019,
        price: 200,
        categoryName: "dc",
      },
      {
        name: "A Turma da Mônica",
        description: "O Senhor da Guerra",
        edition: "199",
        year: 2020,
        price: 16.90,
        categoryName: "mauricio",
      },
      {
        name: "Mônica",
        description: "4ª Série - Panini",
        edition: "004",
        year: 2015,
        price: 8.90,
        categoryName: "mauricio",
      }
    ]
  })

  return await prismaClient.comic.findMany();
}

export async function applyDiscount(comicId: string, discount: number) {
  const comic = await prismaClient.comic.findUnique({
    where: {
      id: comicId
    }
  });

  if (!comic) {
    throw new Error("Comic not found");
  }

  const newPrice = Number(comic.price) - (Number(comic.price) * (discount / 100));

  await prismaClient.comic.update({
    where: {
      id: comicId
    },
    data: {
      price: newPrice
    }
  }
  );

  return await prismaClient.comic.findUnique({
    where: {
      id: comicId
    }
  }
  );
}
