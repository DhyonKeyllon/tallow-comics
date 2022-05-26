import { Collection } from "@prisma/client";
import { useState } from "react";

export default function useCollections(pageLimit: number, search?: string, category?: string, orderBy?: string, year?: string) {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [countCollections, setCountCollections] = useState(0);

  async function fetchCollections(page: number) {
    const virtualPage = ((page - 1) * pageLimit) <= 0
    ? 0
    : ((page - 1) * pageLimit);

    const data = await fetch(`http://localhost:3000/api/collections/get?pageOffSet=${virtualPage}&pageLimit=${pageLimit}&search=${search}&category=${category}&order=${orderBy}&year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    setCollections(data.data);
    setCountCollections(Math.round(data.count / pageLimit));
  }

  return {
    fetchCollections,
    collections,
    countCollections
  }
}
