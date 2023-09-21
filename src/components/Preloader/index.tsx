import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { isDevModeOn, isPreloaderFinished } from "@/store";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

const Preloader = () => {
  const $isPreloaderFinished = useStore(isPreloaderFinished);
  const $isDevModeOn = useStore(isDevModeOn);
  const [isHideLoading, setIsHideLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = !$isPreloaderFinished ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [$isPreloaderFinished]);

  useEffect(() => {
    if (!$isDevModeOn) return;
    isPreloaderFinished.set(true);
  }, [$isDevModeOn]);

  if ($isDevModeOn) return null;

  return (
    <motion.div
      className={styles.preloader}
      animate={{
        translateY: "-100%",
      }}
      transition={{
        type: "easeInOut",
        duration: 1,
        delay: 2.8,
      }}
      onAnimationComplete={() => isPreloaderFinished.set(!$isPreloaderFinished)}
    >
      <div className={styles.preloader__layer} />
      <motion.div
        className={styles.preloader__indicator}
        initial={"hidden"}
        animate={isHideLoading ? "hidden" : "visible"}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        transition={{
          duration: 0.6,
        }}
      >
        Loading
      </motion.div>
      <div className={styles.preloader__loader}>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              y: 280,
            }}
            animate={{
              y: [280, 0, 0],
            }}
            transition={{
              times: [0, 0.5, 1],
              type: "linear",
              duration: 1,
              delay: 1.2,
            }}
            onAnimationComplete={() => setIsHideLoading(true)}
          >
            100
          </motion.div>
        </div>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              opacity: 1,
              y: 280,
            }}
            animate={{
              y: [280, 0, -280],
            }}
            transition={{
              times: [0, 0.5, 1],
              type: "linear",
              duration: 1,
              delay: 0.6,
            }}
          >
            46
          </motion.div>
        </div>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              opacity: 0,
              y: 0,
            }}
            animate={{
              opacity: [0, 1, 1],
              y: [0, 0, -280],
            }}
            transition={{
              times: [0, 0.5, 1],
              type: "linear",
              duration: 1,
            }}
          >
            01
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
