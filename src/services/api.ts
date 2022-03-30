import { prismaClient } from "./database/prismaClient";

export async function createComic() {
  await prismaClient.comic.create({
    data: {
      name: "Capitão américa e os Vingadores",
      description: "CAPITÃO AMÉRICA [ABRIL - 1ª SÉRIE] Nº 056 JAN/1984 - VIDE DETALHES",
      price: 19.99,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Capitão américa e os Vingadores",
      description: "CAPITÃO AMÉRICA & OS VINGADORES SECRETOS Nº 003 SET/2011 - A ERA HEROICA",
      price: 19.99,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Capitão américa e os Vingadores",
      description: "CAPITÃO AMÉRICA & OS VINGADORES SECRETOS Nº 002 AGO/2011 - A ERA HEROICA",
      price: 19.99,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Coleção Homem-Aranha",
      description: "BIBLIOTECA HISTÓRICA MARVEL HOMEM-ARANHA [PANINI] Nº 001 JUL/2007 - CAPA DURA - LACRADO",
      price: 499.90,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Wolverine",
      description: "GRAPHIC MARVEL [ABRIL] Nº 011 FEV/1992 - WOLVERINE: ESCOLHAS MALDITAS",
      price: 34.90,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Wolverine",
      description: "WOLVERINE [PANINI - 1ª SÉRIE] Nº 019 JUN/2006",
      price: 34.90,
    }
  });

  await prismaClient.comic.create({
    data: {
      name: "Wolverine",
      description: "WOLVERINE [PANINI - 1ª SÉRIE] Nº 047 OUT/2008",
      price: 34.90,
    }
  });

  return await prismaClient.comic.findMany();
}

export async function getComics() {
  return await prismaClient.comic.findMany();
}