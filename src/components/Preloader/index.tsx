import React, { useEffect, useState } from "react";
import { useStore } from "@nanostores/react";
import { isDevModeOn, isPreloaderFinished } from "@/store";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import ShowSingleDigit from "@/components/ShowSingleDigit";

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
        type: "easeOut",
        duration: 1,
        delay: 2.5,
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
          },
          visible: {
            opacity: 1,
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
              opacity: [1, 1, 0],
            }}
            transition={{
              times: [0, 0.5, 1],
              type: "easeInOut",
              duration: 1,
              delay: 1.6,
            }}
          >
            <ShowSingleDigit
              initialArray={["85", "100"]}
              speed={0.2}
              delay={0.8}
            />
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
              y: [280, -280],
            }}
            transition={{
              times: [0, 1],
              type: "easeInOut",
              duration: 1.2,
              delay: 0.8,
            }}
            onAnimationComplete={() => setIsHideLoading(true)}
          >
            <ShowSingleDigit initialArray={["46", "55", "64"]} speed={0.4} />
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
              type: "easeInOut",
              duration: 1,
            }}
          >
            <ShowSingleDigit initialArray={["01", "05"]} speed={0.2} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
