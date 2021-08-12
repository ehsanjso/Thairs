import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import AppRouter from "./routers/AppRouter";
import Loading from "./components/Loading";
import { startLogin, startRegister } from "./actions/auth";
import "./styles/app.scss";

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      const params = new URLSearchParams(window.location.search);
      const groupToken = params.get("group");
      const user = JSON.parse(localStorage.getItem("grecom-user"));
      if (groupToken) {
        localStorage.setItem(
          "grecom-group",
          JSON.stringify({ token: groupToken })
        );
      }
      if (user) {
        store.dispatch(startLogin(user.token));
      } else {
        store.dispatch(startRegister());
      }

      setLoading(false);
    };
    getData();
  }, []);
  return (
    <Provider store={store}>{loading ? <Loading /> : <AppRouter />}</Provider>
  );
};

export default App;
