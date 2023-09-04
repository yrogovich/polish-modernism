import React, {useEffect, useRef, useState} from 'react'
import styles from './styles.module.scss'

const Navbar = () => {
  const [navbarHeight, setNavbarHeight] = useState(null);
  const navbarRef = useRef(null);

  useEffect(() => {
    setNavbarHeight(navbarRef.current.clientHeight);
  }, [navbarRef])

  return (
    <>
      <div className={styles.navbar} ref={navbarRef}>
        <div className={styles.navbar__label}>Collection <br/> of Polish modernism</div>
        <div className={styles.navbar__label}>About us</div>
        <div className={styles.navbar__label}>Show Grid</div>
      </div>
      <div style={{height: `${navbarHeight}px`}}></div>
    </>
  );
};

export default Navbar;