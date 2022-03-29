import Image from "next/image";
import { FocusEventHandler } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";

import styles from "./styles.module.scss";

// import Image from "next/image";

type CardProps = {
  name: string,
  price: number,
  createdAt: Date,
  description?: string,
  image?: StaticImageData,
};

export function CardComponent({ name, price, description, image, createdAt }: CardProps) {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageArea}>
        {image ? <Image  src={image} alt="Imagem do gibi" width={168} height={120} /> : <MdOutlinePhotoLibrary />}
      </div>
      <h3>{name}</h3>
      <div className={styles.informationArea}>
        <p>{description}</p>
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
