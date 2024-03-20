import { FC, useState } from "react";
import styles from "./Main.module.scss";
import plusCircle from "../../images/plus-circle.svg";
import playCircle from "../../images/play-circle.svg";
import { taskList } from "./constants";
import { Footer } from "../../components/Footer/Footer";
import { useAppSelector } from "../../services/hooks";
import { Popup } from "../../components/Popup/Popup";
import saveIcon from "../../images/save-01.svg";
import wakeIcon from "../../images/log-out-04.svg";
import { Button } from "../../components/Button/Button";

export const Main: FC = () => {
  const [isTask, setIsTask] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [editTask, setEditTask] = useState(false);
  const { task } = useAppSelector((state) => state.task);
  //console.log(task);

  const addTask = () => {
    const newTask = {
      name: isTask,
    };
    console.log(newTask);
    setIsTask("");
  };

  return (
    <div className={styles.conteiner}>
      <form className={styles.conteiner_form}>
        <label className={styles.conteiner_block}>
          <input
            className={styles.conteiner_task}
            type="text"
            value={isTask}
            onChange={(e) => setIsTask(e.target.value)}
          ></input>
          <img
            src={plusCircle}
            alt="Иконка плюсик"
            className={styles.icon}
            onClick={addTask}
          />
        </label>
        <img src={playCircle} alt="Иконка play" className={styles.icon_play} />
      </form>
      <ul className={styles.list}>
        {taskList.map((item) => (
          <li className={styles.list_task} onClick={() => setEditTask(true)}>
            <p className={styles.list_item}>{item.task}</p>
            <p className={styles.list_item}>{item.time}</p>
            <p className={styles.list_count}>{item.count}</p>
          </li>
        ))}
      </ul>
      <ul className={styles.list}>
        <div className={styles.list_header}>
          <p className={styles.list_title}>Сегодня</p>
          <img
            src={plusCircle}
            alt="Иконка плюсик"
            className={styles.list_icon}
            onClick={addTask}
          />
          <p className={styles.list_time}>2 ч 45 м</p>
        </div>
        {/* {taskList.map((item) => (
          <li className={styles.list_task} onClick={() => setEditTask(true)}>
            <p className={styles.list_item}>{item.task}</p>
          </li>
        ))} */}
      </ul>
      <Footer />
      <Popup
        isOpen={editTask}
        setPopupOpen={setEditTask}
        textTitle={"Редактирование задачи"}
      >
        <>
          <label className={styles.field}>
            <input
              className={styles.field_input}
              value={currentTask}
              onChange={(e) => setCurrentTask(e.target.value)}
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
              text={"Выйти"}
              color={"black"}
              onClick={onclick}
              icon={wakeIcon}
            ></Button>
          </div>
        </>
      </Popup>
    </div>
  );
};
