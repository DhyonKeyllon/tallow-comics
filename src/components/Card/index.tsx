import Image from "next/image";

import styles from "./styles.module.scss";

type CardProps = {
  name: String,
  price: Number,
  description?: String,
  image?: String,
};

export function CardComponent({ name, price, description, image }: CardProps) {
  return (
    <div className={styles.cardContainer}>
      { image && <Image src="" alt="Imagem do gibi" /> }
      <h3>{name}</h3>
      <p>{description}</p>
      <span>{price}</span>
    </div>
  );
}

CardComponent.defaultProps = {
  description: "",
};
