import { Comic } from "@prisma/client";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import cardPicture from "../../public/images/comic--background.webp";
import { CardComponent } from "../components/Card";
import { InputComponent } from "../components/Input";
import { createComic } from "../services/api";
import { prismaClient } from "../services/database/prismaClient";
import styles from "./home.module.scss";

type ComicProps = {
  comics: Comic[]
}

export default function Home({ comics }: ComicProps) {
  const [search, setSearch] = useState("");
  const [filteredComics, setFilteredComics] = useState(comics);

  useEffect(() => {
    setFilteredComics(comics.filter((comic) => comic.name.toLowerCase().includes(search.toLowerCase())));
  }, [comics, search]);

  return (
    <div className={styles.homePageContainer}>
      <InputComponent type={"text"} onChange={(event) => setSearch(event.target.value)} placeholder={"Pesquisar"} value={search} />
      <div className={styles.content}>
        {filteredComics.map(comic => (
          <CardComponent
            key={comic.id}
            name={comic.name}
            description={comic.description ? comic.description : "Sem descrição"}
            price={Number(comic.price)}
            image={cardPicture}
            createdAt={comic.createdAt}
          />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const comics = await prismaClient.comic.findMany();

  if(comics.length === 0) {
    const comics = await createComic();

    const data = comics.map(comic => {
      return {
        id: comic.id,
        name: comic.name,
        description: comic.description,
        price: comic.price.toJSON(),
        createdAt: format(parseISO(comic.createdAt.toISOString()), 'd MMM yy', { locale: ptBR }),
      }
    })

    return {
      props: {
        comics: data,
      },
    }
  }

  const data = comics.map(comic => {
    return {
      id: comic.id,
      name: comic.name,
      description: comic.description,
      price: comic.price.toJSON(),
      createdAt: format(parseISO(comic.createdAt.toISOString()), 'd MMM yy', { locale: ptBR }),
    }
  })

  return {
    props: {
      comics: data,
    },
  }
}
