import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { groupHost } from "../actions/consts/host";
import { useSelector } from "react-redux";
import { history } from "../routers/AppRouter";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children, userToken }) {
  const groupTokenL = JSON.parse(localStorage.getItem("grecom-group"));
  const groupToken = groupTokenL ? groupTokenL.token : userToken;
  const [socket, setSocket] = useState();

  useEffect(() => {
    const newSocket = io(groupHost, { query: { groupToken } });
    setSocket(newSocket);
    console.log("connected!");
    return () => newSocket.close();
  }, [groupToken]);

  return (
    <SocketContext.Provider value={{ socket, groupToken }}>
      {children}
    </SocketContext.Provider>
  );
}
