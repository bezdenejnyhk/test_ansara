import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTask } from "../../types/TTask";
import { AppDispatch, AppThunk } from "../store";
import { getTasksApi } from "../../Api/api";

interface TaskState {
  task: TTask;
  tasks: TTask[];
  isError: boolean;
  isLoading: boolean;
}

const initialState: TaskState = {
  task: {
    id: 0,
    name: "",
    dataStart: 0,
    dataEnd: 0,
    start: false,
    end: false,
  },
  tasks: [],
  isError: false,
  isLoading: false,
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTask(state, action: PayloadAction<TTask>) {
      state.task = action.payload;
    },
    setTasks(state, action: PayloadAction<TTask[]>) {
      state.tasks = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },

    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setTask, setTasks, setError, setLoading } = taskSlice.actions;

export const getTasks: AppThunk = () => (dispatch: AppDispatch) => {
  setLoading(true);
  getTasksApi()
    .then((res) => {
      dispatch(setTasks(res));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};
