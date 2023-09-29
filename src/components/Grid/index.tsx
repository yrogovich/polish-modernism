import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { useWindowSize } from "usehooks-ts";

const Grid = ({ isOn }) => {
  const { width } = useWindowSize();
  const cols = width < 768 ? 12 : 30;

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
