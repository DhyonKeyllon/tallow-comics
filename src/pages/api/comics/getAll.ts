import { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../../services/database/prismaClient";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const pageOffSet = Number(req.query);
  const pageLimit = Number(req.query);

  const data = await prismaClient.comic.findMany({
    orderBy: {
      name: "asc"
    }
  });

  return res.status(201).json({ data });
}
