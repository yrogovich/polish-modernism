import React, { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";
import { useStore } from "@nanostores/react";
import { isMobileMenuOpen, isPopupOpen, navHeight } from "@/store.js";

const MobileMenu = ({ isShowGrid, setIsShowGrid }) => {
  const $isMobileMenuOpen = useStore(isMobileMenuOpen);
  const $isPopupOpen = useStore(isPopupOpen);
  const $navbarHeight = useStore(navHeight);

  useEffect(() => {
    if ($isMobileMenuOpen) {
      isPopupOpen.set(false);
    }
  }, [$isMobileMenuOpen]);

  return (
    <motion.div
      className={styles.menu}
      variants={{
        hidden: {
          translateY: "-100%",
        },
        opened: {
          translateY: "0%",
        },
      }}
      initial={"hidden"}
      animate={$isMobileMenuOpen ? "opened" : "hidden"}
      transition={{
        duration: 0.6,
        type: "easeInOut",
      }}
      style={{
        paddingTop: `${$navbarHeight}px`,
      }}
    >
      <div className={styles.menu__items}>
        <button
          className={styles.menu__item}
          onClick={() => {
            isPopupOpen.set(!$isPopupOpen);
            isMobileMenuOpen.set(!$isMobileMenuOpen);
          }}
        >
          about us
        </button>
        <button
          className={styles.menu__item}
          onClick={() => {
            setIsShowGrid(!isShowGrid);
            isMobileMenuOpen.set(!$isMobileMenuOpen);
          }}
        >
          {isShowGrid ? "Hide grid" : "Show grid"}
        </button>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
