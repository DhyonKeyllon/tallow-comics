import { Comic } from "@prisma/client";
import { GetServerSideProps } from "next";
import { useState } from "react";

import { CardComponent } from "../components/Card";
import { InputComponent } from "../components/Input";
import { prismaClient } from "../services/database/prismaClient";
import styles from "./home.module.scss";

type ComicProps = {
  comics: Comic[]
}

export default function Home({ comics }: ComicProps) {
  console.log(comics);

  return (
    <div className={styles.homePageContainer}>
      <InputComponent type={'text'}  />
      <div className={styles.content}>
        {comics.map(comic => (
          <CardComponent
            key={comic.id}
            name={comic.name}
            description={comic.description ? comic.description : "Sem descrição"}
            price={Number(comic.price)}
          />
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const comics = await prismaClient.comic.findMany();

  const data = comics.map(comic => {
    return {
      id: comic.id,
      name: comic.name,
      description: comic.description,
      price: comic.price.toJSON(),
      date: comic.createdAt.toISOString(),
    }
  })

  return {
    props: {
      comics: data,
    },
  }
}
