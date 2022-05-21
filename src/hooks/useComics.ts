import { Comic } from "@prisma/client";
import { useState } from "react";

export default function useComics(pageLimit: number, search?: string, category?: string, orderBy?: string, year?: string) {
  const [comics, setComics] = useState<Comic[]>([]);
  const [count, setCount] = useState(0);

  async function fetchComics(page: number) {
    const virtualPage = ((page - 1) * pageLimit) <= 0
    ? 0
    : ((page - 1) * pageLimit);

    const data = await fetch(`http://localhost:3000/api/comics/get?pageOffSet=${virtualPage}&pageLimit=${pageLimit}&search=${search}&category=${category}&order=${orderBy}&year=${year}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());

    setComics(data.data);
    setCount(Math.round(data.count / pageLimit));
  }

  return {
    fetchComics,
    comics,
    count
  }
}
