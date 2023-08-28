import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';

const MasonryImages = ({ images }) => {
  const [randomizedImages, setRandomizedImages] = useState([]);

  const generateRandomSize = (possibleSizes = ['small', 'medium', 'large']) => {
    return possibleSizes[Math.floor(Math.random() * possibleSizes.length)];
  }

  const randomizeImagesOrder = (images) => {
    return images.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    setRandomizedImages(randomizeImagesOrder(images));
  }, [images]);

  return (
    <section>
      <div className="container">
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
              <React.Fragment key={index}>
                <div className={styles.image} data-size={generateRandomSize()} style={{marginTop}}>
                  <img src={image.src} alt={name} width={500} height={500} />
                  <div className={styles.image__hover}>
                    <h2>{name}</h2>
                    <p>{years}</p>
                    <p>{architect}</p>
                    <p>{location}</p>
                  </div>
                </div>
                {isDivisibleBy3 && <div className={styles.spacing} data-size={generateRandomSize()}></div>}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default MasonryImages;