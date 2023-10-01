import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { isMobileMenuOpen, isPopupOpen } from "@/store.js";
import { authors } from "@/pages/data/authors.js";
import styles from "./styles.module.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Popup = () => {
  const $isPopupOpen = useStore(isPopupOpen);

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      isPopupOpen.set(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = $isPopupOpen ? "hidden" : "auto";

    if ($isPopupOpen) {
      isMobileMenuOpen.set(false);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [$isPopupOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderAuthor = (author, index) => (
    <motion.div className={styles.popup__author} key={`author-${index}`}>
      <motion.div className={styles.popup__authorRole}>
        {author.role}
      </motion.div>
      <motion.a
        href={author.socials[0].link}
        className={styles.popup__authorImage}
      >
        <LazyLoadImage
          src={author.image.src}
          alt={author.name}
          height={360}
          width={360}
        />
      </motion.a>
      <motion.div className={styles.popup__authorName}>
        {author.name}
      </motion.div>
      <motion.div className={styles.popup__authorSocials}>
        {author.socials.map((social) => (
          <motion.a
            href={social.link}
            target={social.target}
            className={styles.popup__authorSocial}
            key={`socials ${social.name}`}
          >
            {social.name}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );

  return (
    <>
      <AnimatePresence>
        {$isPopupOpen && (
          <>
            <div
              className={styles.popup__bg}
              onClick={() => isPopupOpen.set(!$isPopupOpen)}
            ></div>
            <motion.div
              className={styles.popup}
              initial={{
                y: "100%",
              }}
              animate={{
                y: 0,
              }}
              exit={{
                y: "100%",
              }}
              transition={{
                duration: 0.6,
                type: "easeInOut",
              }}
              key={`popup-${$isPopupOpen}`}
              layout
            >
              <motion.div className={styles.popup__content}>
                <motion.div className={styles.popup__row}>
                  {authors.map((author, index) => renderAuthor(author, index))}
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Popup;
