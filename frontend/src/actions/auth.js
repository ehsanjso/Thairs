import axios from "axios";
import { history } from "../routers/AppRouter";
import { groupHost } from "./consts/host";
import { message } from "antd";
import { changeFetchInProg } from "./fetchInProgress";

export const login = (user) => ({
  type: "LOGIN",
  user,
});

export const addGroup = (groupToken) => ({
  type: "ADD_GROUP",
  groupToken,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogin = (token) => {
  return async (dispatch) => {
    dispatch(changeFetchInProg(true));
    try {
      const header = {};
      let key;
      // check token existance for impersonate and if null for oAuth
      header.headers = {
        Authorization: `Bearer ${token}`,
      };
      key = token;

      const { data } = await axios.get(`${groupHost}/users/me`, header);
      localStorage.setItem("grecom-user", JSON.stringify({ token: key }));
      dispatch(login({ ...data, uid: key }));
    } catch (e) {
      message.warning("User not found!");
    }
    dispatch(changeFetchInProg(false));
  };
};

export const startRegister = () => {
  return async (dispatch) => {
    dispatch(changeFetchInProg(true));
    try {
      const res = await axios.post(`${groupHost}/users`);
      dispatch(startLogin(res.data.token));
    } catch (e) {
      message.warning("Something went wrong!");
    }
    dispatch(changeFetchInProg(false));
  };
};

export const startLogout = () => {
  return async (dispatch, getState) => {
    dispatch(changeFetchInProg(true));
    const header = {
      headers: {
        Authorization: `Bearer ${getState().auth.uid}`,
      },
    };
    await axios.post(`${groupHost}/users/logout`, undefined, header);
    dispatch(logout());
    localStorage.removeItem("user");
    dispatch(changeFetchInProg(false));
    history.push("/login");
  };
};
