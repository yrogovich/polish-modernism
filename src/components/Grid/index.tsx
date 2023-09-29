import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

const Grid = ({ isOn }) => {
  const cols = 30;

  const grid = Array(cols).fill(null);

  const cells = grid.map((col, colIndex) => {
    return <div className={styles.grid__cell} key={`col-${colIndex}`}></div>;
  });

  return (
    <motion.div
      className={styles.grid}
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          opacity: [0.2, 0.15, 0, 0.2],
          type: "spring",
        },
      }}
      initial={"hidden"}
      animate={isOn ? "visible" : "hidden"}
    >
      {cells}
    </motion.div>
  );
};

export default Grid;
