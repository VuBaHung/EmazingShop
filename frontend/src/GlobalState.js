import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
// import { server } from "./server";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshtoken = async () => {
    await axios
      .get("/user/refresh_token")
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err);
      });
    // console.log({ token });
  };
  useEffect(() => {
    refreshtoken();
  }, []);
  const state = {
    token: [token, setToken],
  };
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
