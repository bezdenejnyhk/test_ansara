import { FC, useCallback, useState } from "react";
import styles from "./Login.module.scss";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { loginUser, setAuth } from "../../services/slices/user";

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [typeInput, setTypeInput] = useState<boolean>(true);
  let location = useLocation();
  const { isAuth, isError } = useAppSelector((state) => state.user);

  const handleSubmit = () => {
    console.log(email, password);
    dispatch(loginUser(email, password));
    setEmail("");
    setPassword("");
  };

  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

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
            type={typeInput ? "password" : "text"}
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
