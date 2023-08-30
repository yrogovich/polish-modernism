import React from 'react'
import { motion } from 'framer-motion'
import styles from './styles.module.scss'

const Preloader = () => {
  return (
    <motion.div
      className={styles.preloader}
      animate={{
        translateY: "-100%",
      }}
      transition={{
        type: 'spring',
        stiffness: 30,
        damping: 10,
        duration: 1,
        delay: 2.8,
      }}
    >
      <div className={styles.preloader__layer} />
      <motion.div
        className={styles.preloader__indicator}
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: .6,
        }}
      >Loading</motion.div>
      <div className={styles.preloader__loader}>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              opacity: 1,
              y: 180,
            }}
            animate={{
              opacity: [1, 1, 1, 1, 0],
              y: [180, 0, 0, 0],
            }}
            transition={{
              duration: 1,
              delay: 2.2,
            }}
          >100</motion.div>
        </div>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              opacity: 1,
              y: 180,
            }}
            animate={{
              opacity: 1,
              y: [180, 0, -180],
            }}
            transition={{
              duration: 1,
              delay: 1.4,
            }}
          >46</motion.div>
        </div>
        <div className={styles.preloader__overflow}>
          <motion.div
            className={styles.preloader__digit}
            initial={{
              opacity: 0,
              y: 180,
            }}
            animate={{
              opacity: [0, 1, 1, 1],
              y: [0, 0, 0, -180],
            }}
            transition={{
              duration: 1,
              delay: .4,
            }}
          >01</motion.div>
        </div>
      </div>
    </motion.div>
  )
};

export default Preloader;