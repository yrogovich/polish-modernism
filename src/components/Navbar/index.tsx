import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./styles.module.scss";
import { useStore } from "@nanostores/react";
import { isPopupOpen, isPreloaderFinished, navHeight } from "@/store.js";
import Switcher from "@/components/Switcher";
import Grid from "@/components/Grid";
import { motion } from "framer-motion";

const Navbar = () => {
  const $isPopupOpen = useStore(isPopupOpen);
  const $isPreloaderFinished = useStore(isPreloaderFinished);
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
      <Grid isOn={isSwitcherOn} />
      {$isPreloaderFinished ? (
        <motion.div
          initial={{
            translateY: "-100%",
          }}
          animate={{
            translateY: 0,
          }}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 10,
            duration: 0.8,
          }}
          className={styles.navbar}
          ref={navbarRef}
        >
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
