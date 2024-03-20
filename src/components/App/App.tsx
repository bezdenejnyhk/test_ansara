import React, { FC, useEffect } from "react";
import styles from "./App.module.scss";
import { Login } from "../../pages/Login/Login";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Main } from "../../pages/Main/Main";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { getTasks } from "../../services/slices/task";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (isAuth) {
      //dispatch(getUser());
      dispatch(getTasks());
    } else {
      navigate("/login");
    }
  }, [dispatch, isAuth, navigate]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
};

export default App;
