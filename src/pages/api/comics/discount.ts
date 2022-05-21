import { Decimal } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../../services/database/prismaClient";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const discount = req.query.discount as string;
  const comicId = req.query.comicId as string;

  const comic = await prismaClient.comic.findUnique({
    where: {
      id: comicId
    }
  });

  if (!comic) {
    return res.status(404).json({ error: "Gibi não encontrado." });
  }

  if (comic.price <=new Decimal(0)) {
    return res.status(203).json({ error: "Não é possível aplicar desconto a um Gibi gratuito." });
  }

  if (Number(discount) <= 0) {
    return res.status(203).json({ error: "O desconto deve ser maior que zero." });
  }

  const newPrice = Number(comic.price) - (Number(comic.price) * (Number(discount) / 100));

  const price = new Decimal(newPrice).toFixed(2);

  const data = await prismaClient.comic.update({
    where: {
      id: comicId
    },
    data: {
      price: price
    }
  });

  return res.status(201).json({ success: "Desconto aplicado.", price: data.price });
}
