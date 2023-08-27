import React from 'react';
import styles from './styles.module.scss';

const MasonryImages = ({ images }) => {
  const generateRandomSize = (possibleSizes = ['small', 'medium', 'large']) => {
    return possibleSizes[Math.floor(Math.random() * possibleSizes.length)];
  }

  const randomizeImagesOrder = (images) => {
    return images.sort(() => Math.random() - 0.5);
  }

  const randomizedImages = randomizeImagesOrder(images);

  return (
    <section>
      <div className={styles.container}>
        <div className={styles.grid}>
          {randomizedImages.map(({
             image,
             name,
             years,
             architect,
             location,
                                 }, index) => {
            const isDivisibleBy2 = (index + 1) % 2 === 0;
            const isDivisibleBy3 = (index + 1) % 3 === 0;

            const marginTop =
              isDivisibleBy2 ? '5rem' : isDivisibleBy3 ? '10rem' : '0px';

            return (
              <>
                <div className={styles.image} data-size={generateRandomSize()} style={{marginTop}}>
                  <img src={image.src} alt={name} width="910" height="910"/>
                  <div className={styles.image__hover}>
                    <h2>{name}</h2>
                    <p>{years}</p>
                    <p>{architect}</p>
                    <p>{location}</p>
                  </div>
                </div>
                {isDivisibleBy3 && <div className={styles.spacing} data-size={generateRandomSize()}></div>}
              </>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default MasonryImages;