import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { isFooterInView } from "@/store.js";
import styles from "./styles.module.scss";

const Footer = ({ architecture }) => {
  if (!architecture) return null;

  const ref = useRef();
  const isInView = useInView(ref, {
    threshold: 0.1,
  });

  const uniqueArchitects = [
    ...new Set(architecture.flatMap(({ architect }) => architect)),
  ];
  const uniqueBuildings = [
    ...new Set(architecture.flatMap(({ name }) => name)),
  ];
  const uniqueLocations = [
    ...new Set(architecture.flatMap(({ location }) => location)),
  ];

  useEffect(() => {
    isFooterInView.set(isInView);
  }, [isInView]);

  return (
    <section className={styles.footer} ref={ref}>
      {isInView && (
        <motion.div layout className={styles.footer__grid}>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <h3 className={styles.footer__title}>Architects</h3>
            <ul className={styles.footer__list}>
              {uniqueArchitects.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <h3 className={styles.footer__title}>Buildings</h3>
            <ul className={styles.footer__list}>
              {uniqueBuildings.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
          >
            <h3 className={styles.footer__title}>Cities</h3>
            <ul className={styles.footer__singleList}>
              {uniqueLocations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Footer;
