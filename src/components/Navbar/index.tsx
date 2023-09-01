import React from 'react';
import styles from './styles.module.scss'

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__label}>Collection <br/> of Polish modernism</div>
      <div className={styles.navbar__label}>About us</div>
      <div className={styles.navbar__label}>Show Grid</div>
    </div>
  );
};

export default Navbar;