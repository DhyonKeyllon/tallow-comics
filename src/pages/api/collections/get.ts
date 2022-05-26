import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "../../../services/database/prismaClient";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { pageOffSet, pageLimit } = req.query;
  const search = req.query.search as string;
  const category = req.query.category as string;
  const order = req.query.order as string;
  const year = req.query.year as string;

  const orderBy = { name: order } as Prisma.Enumerable<Prisma.ComicOrderByWithRelationInput> | undefined;

  if (search && category) {
    const data = await prismaClient.collection.findMany({
      skip: Number(pageOffSet),
      take: Number(pageLimit),
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
        AND: {
          category: {
            name: {
              equals: category,
            },
          },
        }
      },
      orderBy
    });

    const count = await prismaClient.collection.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            description: {
              contains: search,
            },
          },
        ],
        AND: {
          category: {
            name: {
              equals: category,
            },
          },
        }
      },
      orderBy
    });

    return res.status(201).json({ data, count });
  }

  if (search) {
    const data = await prismaClient.collection.findMany({
      skip: Number(pageOffSet),
      take: Number(pageLimit),
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            edition: {
              contains: search,
            },
          },
        ],
      },
      orderBy
    });

    const count = await prismaClient.collection.count({
      where: {
        OR: [
          {
            name: {
              contains: search,
            },
          },
          {
            edition: {
              contains: search,
            },
          },
        ],
      },
      orderBy
    });

    return res.status(201).json({ data, count });
  }

  if (category) {
    const data = await prismaClient.collection.findMany({
      skip: Number(pageOffSet),
      take: Number(pageLimit),
      where: {
        category: {
          name: category
        },
      },
    orderBy
  });

    const count = await prismaClient.collection.count({
      where: {
        category: {
          name: {
            equals: category,
          },
        },
      },
      orderBy
    });

    return res.status(201).json({ data, count });
  }

  if (year) {
    const data = await prismaClient.collection.findMany({
      skip: Number(pageOffSet),
      take: Number(pageLimit),
      where: {
        year: {
          equals: Number(year)
        }
      },
    });

    const count = await prismaClient.collection.count({
      where: {
        year: {
          equals: Number(year),
        },
      },
    });

    return res.status(201).json({ data, count });
  }

  const count = await prismaClient.collection.count();

  const data = await prismaClient.collection.findMany({
    skip: Number(pageOffSet),
    take: Number(pageLimit),
    orderBy
  });

  return res.status(201).json({ data, count });
}
