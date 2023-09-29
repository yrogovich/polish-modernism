import React from 'react';
import styles from './styles.module.scss';

const Switcher = ({
  label,
  isOn,
  setIsOn
}) => {
  return (
    <label className={styles.switcher}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={() => setIsOn(!isOn)}
      />
      <span className={styles.switcher__switch}></span>
      <span className={styles.switcher__label}>{label}</span>
    </label>
  );
};

export default Switcher;