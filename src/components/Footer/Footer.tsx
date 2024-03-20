import { FC, useState } from "react";
import styles from "./Footer.module.scss";
import alignBottom from "../../images/align-bottom-01.svg";
import userIcon from "../../images/user-03.svg";
import calendar from "../../images/calendar-check-02.svg";
import saveIcon from "../../images/save-01.svg";
import wakeIcon from "../../images/log-out-04.svg";
import { Popup } from "../Popup/Popup";
import { useAppSelector } from "../../services/hooks";
import { Button } from "../Button/Button";
import { useNavigate } from 'react-router-dom'
import { APP_ROUTES } from '../../constants'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { setAuth } from '../../services/slices/user'
import { authTokenKey } from '../../auth/auth'

export const Footer: FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [popupUser, setPopupUser] = useState(false);
  const [currentUser, setCurrentUser] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleLogout(e: Event) {
    Cookies.remove(authTokenKey);
    dispatch(setAuth(false))
    navigate(APP_ROUTES.LOGIN_PAGE);
  }

  return (
    <div className={styles.footer}>
      <div className={styles.info}>
        <img
          src={alignBottom}
          alt="Иконка загрузки"
          className={`${styles.icon}`}
        />
        <p className={styles.text}>Загрузить ещё</p>
      </div>
      <div className={styles.info}>
        <img
          src={calendar}
          alt="Иконка календарь"
          className={styles.icon_calendar}
        />
        <p className={styles.text}>Только сегодня</p>
      </div>
      <div className={styles.info} onClick={() => setPopupUser(true)}>
        <img src={userIcon} alt="Иконка профиль" className={styles.icon_user} />
        <p className={styles.text}>{user.username}</p>
      </div>
      <Popup
        isOpen={popupUser}
        setPopupOpen={setPopupUser}
        textTitle={"Редактирование профиля"}
      >
        <>
          <label className={styles.field}>
            <input
              className={styles.field_input}
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
            />
          </label>
          <label className={styles.field}>
            <input
              className={styles.field_input}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </label>
          <div className={styles.button}>
            <Button
              text={"Сохранить"}
              color={"white"}
              onClick={onclick}
              icon={saveIcon}
            ></Button>
            <Button
              type="button"
              text={"Выйти"}
              color={"black"}
              onClick={handleLogout}
              icon={wakeIcon}
            ></Button>
          </div>
        </>
      </Popup>
    </div>
  );
};
