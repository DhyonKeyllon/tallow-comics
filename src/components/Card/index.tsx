import Image from "next/image";
import { useState } from "react";
import { MdOutlinePhotoLibrary } from "react-icons/md";

import styles from "./styles.module.scss";

type CardProps = {
  name: string,
  formatedPrice: string,
  year: number,
  edition: string,
  description?: string,
  image?: StaticImageData,
};

export function CardComponent({ name, formatedPrice, description, image, year, edition}: CardProps) {
  const [mouseOver, setMouseOver] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.imageArea}>
        { image ?
          <Image src={image} alt="Imagem do gibi" width={200} height={152} />
          : <MdOutlinePhotoLibrary />
        }
      </div>
      <h3>{name}</h3>
      <div className={styles.informationArea}>
        {mouseOver ?
          <h5
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          >
            { description }
          </h5>
          :
          <h5 className={styles.description}
            onMouseOver={() => setMouseOver(true)}
            onMouseOut={() => setMouseOver(false)}
          >
            { description }
          </h5>
        }
      </div>
      <h6>Edição: Nº {edition}</h6>
      <h6>Ano: {year}</h6>
      <span className={styles.price}>
        {formatedPrice}
      </span>
    </div>
  );
}

CardComponent.defaultProps = {
  description: "",
  image: "",
};
