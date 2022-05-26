import { Decimal } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../../services/database/prismaClient";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const discount = req.query.discount as string;
  const collectionId = req.query.collectionId as string;

  const collection = await prismaClient.collection.findUnique({
    where: {
      id: collectionId,
    }
  });

  if (!collection) {
    return res.status(404).json({ error: "Coleção não encontrada." });
  }

  if (collection.price <=new Decimal(0)) {
    return res.status(203).json({ error: "Não é possível aplicar desconto a uma Coleção gratuita." });
  }

  if (Number(discount) <= 0) {
    return res.status(203).json({ error: "O desconto deve ser maior que zero." });
  }

  const newPrice = Number(collection.price) - (Number(collection.price) * (Number(discount) / 100));

  const price = new Decimal(newPrice).toFixed(2);

  const data = await prismaClient.collection.update({
    where: {
      id: collectionId
    },
    data: {
      price: price
    }
  });

  return res.status(201).json({ success: "Desconto aplicado.", price: data.price });
}
