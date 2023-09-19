import React, {useEffect} from 'react'
import {useStore} from '@nanostores/react'
import {AnimatePresence, motion} from 'framer-motion'
import {isDevModeOn, isPopupOpen} from '@/store.js'

import yaro from "@/assets/images/yaro.jpg";
import vlad from "@/assets/images/wladek.jpg";

import styles from './styles.module.scss'

const Popup = () => {
  const $isPopupOpen = useStore(isPopupOpen);
  const $isDevModeOn = useStore(isDevModeOn);

  const handleKeyDown = (e) => {
    if (e.code === 'Escape') {
      isPopupOpen.set(false);
    }
  }

  useEffect(() => {
    document.body.style.overflow = $isPopupOpen ? 'hidden' : 'auto';

    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [$isPopupOpen]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <>
      {!$isDevModeOn && <motion.div className={styles.popup__background} onClick={() => isPopupOpen.set(!$isPopupOpen)} ></motion.div>}
      <AnimatePresence>
        {$isPopupOpen && (
          <motion.div
            className={styles.popup}
            initial={{
              y: '100%',
            }}
            animate={{
              y: 0,
            }}
            exit={{
              y: '100%',
            }}
            transition={{
              duration: .8,
              type: 'spring',
              stiffness: 30,
              damping: 10,
            }}
            key={`popup-${$isPopupOpen}`}
          >
            <motion.div className={styles.popup__content}>
            <motion.div className={styles.popup__row}>
              <motion.div className={styles.popup__author}>
                <motion.div className={styles.popup__authorRole}>Development</motion.div>
                <motion.div className={styles.popup__authorImage}>
                  <motion.img src={yaro.src} alt="Author" />
                </motion.div>
                <motion.div className={styles.popup__authorName}>Yaroslav<br />Rogovich</motion.div>
                <motion.div className={styles.popup__authorSocials}>
                  <motion.a href="https://www.linkedin.com/in/yaroslav-rogovich/" target="_blank" className={styles.popup__authorSocial}>Linkedin</motion.a>
                  <motion.a href="mailto:aka@yaro.works" className={styles.popup__authorSocial}>aka@yaro.works</motion.a>
                </motion.div>
              </motion.div>

              <motion.div className={styles.popup__author}>
                <motion.div className={styles.popup__authorRole}>Design</motion.div>
                <motion.div className={styles.popup__authorImage}>
                  <motion.img src={vlad.src} alt="Author" />
                </motion.div>
                <motion.div className={styles.popup__authorName}>Vladyslav<br />Starobzhanskyi</motion.div>
                <motion.div className={styles.popup__authorSocials}>
                  <motion.a href="https://www.linkedin.com/in/starobzhanski/" target="_blank" className={styles.popup__authorSocial}>Linkedin</motion.a>
                  <motion.a href="mailto:starobzhanskyi@gmail.com" className={styles.popup__authorSocial}>starobzhanskyi@gmail.com</motion.a>
                </motion.div>
              </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popup;