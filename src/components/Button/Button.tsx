import { FC } from "react";
import { TButton } from "../../types/TButton";
import styles from "./Button.module.scss";

export const Button: FC<TButton> = ({ text, color, onClick, icon }) => {
  return (
    <button
      onClick={(e) => {
        onClick(e);
      }}
      className={`${styles.button} ${color === "white" && styles.white}`}
    >
      <img src={icon} alt="Иконка на кнопке" className={styles.icon} />
      {text}
    </button>
  );
};
