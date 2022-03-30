import Image from "next/image";
import { useState } from "react";
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
        {image ?
          <Image  src={image} alt="Imagem do gibi" width={200} height={152} />
          : <MdOutlinePhotoLibrary />
        }
      </div>
      <h3>{name}</h3>
      <div className={styles.informationArea}>
        {mouseOver ?
          <h5
            onMouseOver={event => setMouseOver(true)}
            onMouseOut={event => setMouseOver(false)}
          >
            {description}
          </h5>
          :
          <h5 className={styles.description}
            onMouseOver={event => setMouseOver(true)}
            onMouseOut={event => setMouseOver(false)}
          >
            {description}
          </h5>
        }
      </div>
      <span className={styles.price}>{price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</span>
      <h6>{createdAt}</h6>
    </div>
  );
}

CardComponent.defaultProps = {
  description: "",
  image: "",
};
