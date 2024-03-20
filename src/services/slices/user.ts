import { AppDispatch, AppThunk } from "../store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { getCookie, setCookie } from "../../utils/cookies";
import { TUser } from "../../types/TUser";
import Cookies from "js-cookie";
import { signIn } from "../../Api/api";

interface userState {
  user: TUser;
  isAuth: boolean;
  isError: boolean;
  isLoadingUser: boolean;
}

const initialStateLogout: userState = {
  user: {
    id: 0,
    username: "",
    password: "",
  },
  isAuth: false,
  isError: false,
  isLoadingUser: false,
};

const initialState: userState = {
  user: {
    id: 0,
    username: "",
    password: "",
  },
  isAuth: !!Cookies.get("accessToken"),
  isError: false,
  isLoadingUser: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      state.isError = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoadingUser = action.payload;
    },
    logout: () => initialStateLogout,
  },
});

export const {
  setUser,
  setAuth,
  setError,
  logout,
  setLoading,
  // setCountStep,
} = userSlice.actions;

// export const registerUser: AppThunk =
//   (username: string, password: string) => (dispatch: AppDispatch) => {
//     dispatch(setLoading(true));
//     signUp(username, password)
//       .then((res) => {
//         Cookies.set("accessToken", res.accessToken);
//         localStorage.setItem("refreshToken", res.refreshToken);
//         dispatch(setAuth(true));
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       });
//   };

export const loginUser: AppThunk =
  (username: string, password: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    signIn(username, password)
      .then((res) => {
        Cookies.set("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch(setError(false));
        dispatch(setAuth(true));
        //dispatch(getUser());
      })
      .catch((err) => {
        dispatch(setError(true));
        console.log(err);
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
