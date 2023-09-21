import React, { useEffect, useRef, useState } from "react";
import { useStore } from "@nanostores/react";
import { isFooterInView, isPreloaderFinished, navHeight } from "@/store";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

const BackgroundContent = () => {
  const [titleRefTop, setTitleRefTop] = useState(0);
  const $isPreloaderFinished = useStore(isPreloaderFinished);
  const $isFooterInView = useStore(isFooterInView);
  const $navbarHeight = useStore(navHeight);
  const titleRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (!titleRef?.current) return;

      titleRef.current.style.transform = "";

      setTitleRefTop(titleRef.current.getBoundingClientRect().top);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [$isPreloaderFinished]);

  useEffect(() => {
    if (!titleRef?.current) return;

    setTitleRefTop(titleRef.current.getBoundingClientRect().top);
  }, [titleRef, $isPreloaderFinished]);

  return $isPreloaderFinished ? (
    <motion.div className={styles.content}>
      {!$isFooterInView && (
        <motion.div
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
            display: $isFooterInView ? "none" : "block",
          }}
          transition={{
            type: "easeInOut",
            duration: 0.6,
            delay: 0.8,
          }}
          className={styles.content__about}
        >
          Modernism - a current in architecture, also called functionalism. It
          developed in Poland in two phases, separated by World War II and the
          enforced period of socialist realism in architecture.
        </motion.div>
      )}
      {!$isFooterInView && (
        <motion.div className={styles.content__dates}>
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "easeInOut",
              duration: 0.6,
              delay: 0.3,
            }}
          >
            1934
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "easeInOut",
              duration: 0.6,
              delay: 0.35,
            }}
          >
            -
          </motion.span>
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              type: "easeInOut",
              duration: 0.6,
              delay: 0.4,
            }}
          >
            1993
          </motion.span>
        </motion.div>
      )}

      <motion.div
        className={styles.content__title}
        ref={titleRef}
        animate={{
          y: $isFooterInView ? -(titleRefTop - $navbarHeight) : 0,
        }}
        transition={{
          type: "easeInOut",
          duration: 0.4,
        }}
      >
        <motion.span
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "easeInOut",
            duration: 0.6,
          }}
        >
          Polish
        </motion.span>
        <motion.span
          initial={{
            opacity: 0,
            y: 200,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            type: "easeInOut",
            duration: 0.6,
            delay: 0.15,
          }}
        >
          Modernism
        </motion.span>
      </motion.div>
    </motion.div>
  ) : null;
};

export default BackgroundContent;
