import React, {useEffect, useRef, useState} from 'react'
import cn from 'classnames'
import styles from './styles.module.scss'
import {useStore} from '@nanostores/react'
import {isPreloaderFinished} from '@/store.js'
import {motion} from 'framer-motion'

const Navbar = () => {
  const $isPreloaderFinished = useStore(isPreloaderFinished);
  const [navbarHeight, setNavbarHeight] = useState(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (!$isPreloaderFinished) return;
    setNavbarHeight(navbarRef.current.clientHeight);
  }, [$isPreloaderFinished])

  return (
    <>
      {$isPreloaderFinished ? <motion.div
        initial={{
          translateY: '-100%',
        }}
        animate={{
          translateY: 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 30,
          damping: 10,
          duration: .8,
        }}
        className={styles.navbar}
        ref={navbarRef}
      >
        <div className={styles.navbar__hamburger}>
          <div className={styles.navbar__hamburger__line}></div>
          <div className={styles.navbar__hamburger__line}></div>
        </div>
        <div className={styles.navbar__label}>Collection <br/> of Polish modernism</div>
        <div className={cn(styles.navbar__label, styles.navbar__desktop)}>About us</div>
        <div className={cn(styles.navbar__label, styles.navbar__desktop)}>Show Grid</div>
      </motion.div> : null}
      <div style={{height: `${navbarHeight}px`}}></div>
    </>
  );
};

export default Navbar;