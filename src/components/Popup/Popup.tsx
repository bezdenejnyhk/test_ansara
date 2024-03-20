import { FC } from "react";
import styles from "./Popup.module.scss";
import { TPopup } from "../../types/TPopup";

export const Popup: FC<TPopup> = ({
  isOpen,
  setPopupOpen,
  textTitle,
  children,
}) => {
  return (
    <div className={`${styles.popup} ${isOpen && styles.popup_opened}`}>
      <div className={styles.popup__container}>
        <h3 className={styles.title}>{textTitle}</h3>
        <button
          type="button"
          className={styles.btnClose}
          onClick={() => setPopupOpen(false)}
        ></button>
        <div className={styles.popupForm}>{children}</div>
      </div>
    </div>
  );
};
