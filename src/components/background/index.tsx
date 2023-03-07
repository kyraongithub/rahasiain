import React from "react";
import styles from "./Background.module.scss";
const Background = () => {
  return (
    <>
      <div className={styles["white"]}>
        <div className={styles["squares"]}>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
          <div className={styles["square"]}></div>
        </div>
      </div>
      <div className={styles["grey"]}></div>
    </>
  );
};

export default Background;
