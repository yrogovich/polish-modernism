import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useStore } from "@nanostores/react";
import {
  isMobileMenuOpen,
  isPopupOpen,
  isPreloaderFinished,
  navHeight,
} from "@/store.js";
import Switcher from "@/components/Switcher";
import Grid from "@/components/Grid";
import { motion } from "framer-motion";
import MobileMenu from "@/components/MobileMenu";

const Navbar = () => {
  const $isPopupOpen = useStore(isPopupOpen);
  const $isPreloaderFinished = useStore(isPreloaderFinished);
  const $isMobileMenuOpen = useStore(isMobileMenuOpen);
  const [navbarHeight, setNavbarHeight] = useState(null);
  const navbarRef = useRef(null);
  const [isSwitcherOn, setIsSwitcherOn] = useState(false);

  useEffect(() => {
    if (!$isPreloaderFinished) return;
    setNavbarHeight(navbarRef.current.clientHeight);
  }, [$isPreloaderFinished]);

  useEffect(() => {
    navHeight.set(navbarHeight);
  }, [navbarHeight]);

  return (
    <>
      <MobileMenu isShowGrid={isSwitcherOn} setIsShowGrid={setIsSwitcherOn} />
      <Grid isOn={isSwitcherOn} />
      {$isPreloaderFinished ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            stiffness: 30,
            damping: 10,
            duration: 0.8,
            delay: 0.5,
          }}
          className={styles.navbar}
          ref={navbarRef}
        >
          <motion.button
            className={styles.navbar__hamburger}
            onClick={() => isMobileMenuOpen.set(!$isMobileMenuOpen)}
            layout
          >
            <motion.div
              className={styles.navbar__hamburgerLine}
              variants={{
                closed: {},
                opened: {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(45deg)",
                },
              }}
              initial={"closed"}
              animate={$isMobileMenuOpen ? "opened" : "closed"}
            ></motion.div>
            <motion.div
              className={styles.navbar__hamburgerLine}
              variants={{
                closed: {},
                opened: {
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%) rotate(-45deg)",
                },
              }}
              initial={"closed"}
              animate={$isMobileMenuOpen ? "opened" : "closed"}
            ></motion.div>
          </motion.button>
          <div className={cn(styles.navbar__label, styles.navbar__logo)}>
            Collection <br /> of Polish modernism
          </div>
          <button
            className={cn(
              styles.navbar__label,
              styles.navbar__desktop,
              styles.navbar__about,
            )}
            onClick={() => isPopupOpen.set(!$isPopupOpen)}
          >
            About us
          </button>
          <span
            className={cn(
              styles.navbar__label,
              styles.navbar__desktop,
              styles.navbar__switch,
            )}
          >
            <Switcher
              label={"Grid"}
              isOn={isSwitcherOn}
              setIsOn={setIsSwitcherOn}
            />
          </span>
        </motion.div>
      ) : null}
      <div style={{ height: `${navbarHeight}px` }}></div>
    </>
  );
};

export default Navbar;
