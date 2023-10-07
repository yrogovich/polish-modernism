import React, { useEffect } from "react";
import { useStore } from "@nanostores/react";
import { AnimatePresence, motion } from "framer-motion";
import { isMobileMenuOpen, isPopupOpen } from "@/store.js";
import { authors } from "@/pages/data/authors.js";
import styles from "./styles.module.scss";

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
      <motion.div
        className={styles.popup__authorRole}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "easeInOut",
          duration: 0.6,
          delay: 1 * (index / 2),
        }}
      >
        {author.role}
      </motion.div>
      <motion.a
        href={author.socials[0].link}
        className={styles.popup__authorImage}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "linear",
          duration: 0.8,
          delay: 0.5 * (index / 2),
        }}
      >
        <img src={author.image.src} alt={author.name} loading={"lazy"} />
      </motion.a>
      <motion.div
        className={styles.popup__authorName}
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "linear",
          duration: 0.5,
          delay: 0.7 * (index / 2),
        }}
      >
        {author.name}
      </motion.div>
      <motion.div
        className={styles.popup__authorSocials}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          type: "easeInOut",
          duration: 0.5,
          delay: 0.6 * index,
        }}
      >
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
                stagger: 0.5,
                duration: 0.6,
                type: "easeInOut",
              }}
              key={`popup-${$isPopupOpen}`}
              layout
            >
              <motion.div className={styles.popup__content}>
                <motion.div className={styles.popup__row}>
                  {authors.map((author, index) =>
                    renderAuthor(author, index + 1),
                  )}
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
