import { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../../services/database/prismaClient";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await prismaClient.comic.create({
    data: {
      name: "Capitão américa e os Vingadores",
      description: "CAPITÃO AMÉRICA [ABRIL - 1ª SÉRIE] Nº 056 JAN/1984 - VIDE DETALHES",
      price: 19.99,
      category: 'Marvel',
      year: 1984,
      edition: "1ª SÉRIE",
    }
  })

  return res.status(201).json({ message: "Comics created"});
}
