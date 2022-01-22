import React from "react";
import styles from "./Message.module.scss";

export const Message: React.FC = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};
