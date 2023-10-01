import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useMediaQuery from "@/hooks/useMediaQuery.jsx";
import styles from "./styles.module.scss";
import { isPopupOpen } from "@/store.js";

const MasonryImages = ({ images }) => {
  const [randomizedImages, setRandomizedImages] = useState([]);
  const repeatingSequence = [0.1, 0.2, 0.3];
  const isMobile = useMediaQuery("(max-width: 768px)");

  const generateRandomSize = (possibleSizes = ["small", "medium", "large"]) => {
    return possibleSizes[Math.floor(Math.random() * possibleSizes.length)];
  };

  const randomizeImagesOrder = (images) => {
    return images.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setRandomizedImages(randomizeImagesOrder(images));
  }, [images]);

  return (
    <section>
      <div className="container">
        <div className={styles.grid}>
          {randomizedImages.map(({ image, name, years, location }, index) => {
            const isDivisibleBy2 = (index + 1) % 2 === 0;
            const isDivisibleBy3 = (index + 1) % 3 === 0;

            const marginTop = isDivisibleBy2
              ? "5rem"
              : isDivisibleBy3
              ? "10rem"
              : "0px";

            const size = generateRandomSize();

            return (
              <React.Fragment key={index}>
                <motion.div
                  className={styles.image}
                  data-size={size}
                  style={{ marginTop }}
                  initial={{
                    opacity: 0,
                    y: 100,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: !isMobile
                      ? repeatingSequence[index % repeatingSequence.length]
                      : null,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.1,
                  }}
                  onClick={() => isPopupOpen.set(true)}
                >
                  <img src={image.src} alt={name} loading={"lazy"} />
                  <div className={styles.image__hover}>
                    <p>{location}</p>
                    <h2>{name}</h2>
                    <p>{years}</p>
                  </div>
                </motion.div>
                {isDivisibleBy3 && (
                  <div
                    className={styles.spacing}
                    data-size={generateRandomSize()}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MasonryImages;
