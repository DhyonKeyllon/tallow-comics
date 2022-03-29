import Image from "next/image";
import { useEffect, useState } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";

import styles from "./styles.module.scss";

type CardProps = {
  name: string,
  price: number,
  createdAt: Date,
  description?: string,
  image?: StaticImageData,
};

export function CardComponent({ name, price, description, image, createdAt }: CardProps) {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageArea}>
        {image ? <Image  src={image} alt="Imagem do gibi" width={168} height={120} /> : <MdOutlinePhotoLibrary />}
      </div>
      <h3>{name}</h3>
      <div className={styles.informationArea}>
        {mouseOver ?
          <h6
            onMouseOver={event => setMouseOver(true)}
            onMouseOut={event => setMouseOver(false)}>
            {description}
          </h6>
          :
          <p
            onMouseOver={event => setMouseOver(true)}
            onMouseOut={event => setMouseOver(false)}>
            {description}
          </p>
        }

        <span>{price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
      </div>
      <h6>{createdAt}</h6>
    </div>
  );
}

CardComponent.defaultProps = {
  description: "",
  image: "",
};
