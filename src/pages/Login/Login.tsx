import { FC, useCallback, useEffect, useState } from "react";
import styles from "./Login.module.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { loginUser, setAuth } from "../../services/slices/user";
import { APP_ROUTES } from '../../constants'

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isAuth, isError } = useAppSelector((state) => state.user);

  const handleSubmit = () => {
    dispatch(loginUser(email, password));
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    if (isAuth) {
      navigate(APP_ROUTES.MAIN_PAGE)
    }
  }, [isAuth]);

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label className={styles.label}>
          <input
            type="text"
            className={`${styles.input} ${styles.input_error}`}
            placeholder="Логин"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className={styles.label}>
          <input
            type="password"
            className={`${styles.input} ${styles.input_error}`}
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button
          className={styles.button}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Войти
        </button>
      </form>
    </div>
  );
};
