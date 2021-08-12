import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "./SocketProvider";
import { history } from "../routers/AppRouter";

const GroupContext = React.createContext();

export function useGroup() {
  return useContext(GroupContext);
}

export function GroupProvider({ children }) {
  const { socket, groupToken } = useSocket();
  const [isGroupCreator, setIsGroupCreator] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const userToken = useSelector((state) => state.auth.token);
  const [group, setGroup] = useState([]);
  const isGroupMode = group.length > 1;

  useEffect(() => {
    if (isGroupCreator) {
      createGroup();
    }
  }, [isGroupCreator]);

  useEffect(() => {
    if (isJoining) {
      createGroup();
    }
  }, [isJoining]);

  useEffect(() => {
    if (socket == null) return;
    socket.on("receive-group-users", addUsers);
    socket.on("start-recom", startRecom);
    socket.on("group-created", getListOfUsers);

    return () => socket.off("receive-comment");
  }, [socket]);

  const addUsers = (users) => {
    setGroup(users);
  };

  const createGroup = () => {
    socket.emit("create-group", {
      userToken,
    });
  };

  const incrementQuestionsAnswered = () => {
    socket.emit("inc-answered-questions", {
      userToken,
    });
  };

  const getListOfUsers = () => {
    socket.emit("get-list-users", {
      groupToken,
    });
  };

  const start = () => {
    socket.emit("start", {});
  };

  const startRecom = () => {
    history.push(`/recommender`);
  };

  return (
    <GroupContext.Provider
      value={{
        isGroupCreator,
        setIsGroupCreator,
        userToken,
        group,
        groupToken,
        start,
        setIsJoining,
        incrementQuestionsAnswered,
        isGroupMode,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}
