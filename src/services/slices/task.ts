import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TTask, TTaskCreate, TTaskGetResponse } from "../../types/TTask";
import { AppDispatch, AppThunk } from "../store";
import { getTasksApi, addTaskApi } from "../../Api/api";

interface TaskState {
  task: TTask;
  tasks: TTaskGetResponse[];
  isError: boolean;
  isLoading: boolean;
}

interface TasksResponse {
  fields: TTaskGetResponse;
}

const initialState: TaskState = {
  task: {
    id: 0,
    name: "",
    datestart: 0,
    dateend: 0,
    started: false,
    ended: false,
    user: "",
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
    .then((res: TasksResponse[]) => {
      dispatch(setTasks(res.map((it) => ({...it.fields}))));
    })
    .catch((err) => {
      setError(true);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
};

export const addTask: AppThunk = (task: TTaskCreate) => (dispatch: AppDispatch) => {
  setLoading(true);
  addTaskApi(task)
    .then(() => {
      dispatch(getTasks());
    })
    .catch((err) => {
      dispatch(setError(true));
      console.log(err)
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

// export const updateSample: AppThunk =
//   (sample: TSampleUpdate) => (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     updateSampleApi(sample)
//       .then((res) => {
//         dispatch(setError(false));
//         dispatch(getSample());
//       })
//       .catch((err) => {
//         dispatch(setError(true));
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       });
//   };
//
// export const deleteSample: AppThunk =
//   (id: number) => (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     deleteSampleApi(id)
//       .then((res) => {
//         dispatch(setError(false));
//         dispatch(getSample());
//       })
//       .catch((err) => {
//         dispatch(setError(true));
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       });
//   };
