import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "./SocketProvider";
import { history } from "../routers/AppRouter";
import { updateFeedback } from "../actions/auth";

const GroupContext = React.createContext();

export function useGroup() {
  return useContext(GroupContext);
}

export function GroupProvider({ children }) {
  const disptach = useDispatch();
  const { socket, groupToken } = useSocket();
  const [isGroupCreator, setIsGroupCreator] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const userToken = useSelector((state) => state.auth.token);
  const hasStar = useSelector((state) => state.auth.hasStar);
  const [group, setGroup] = useState([]);
  const [clusters, setClusters] = useState(undefined);
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
    socket.on("get-movie", getGroupMovie);
    socket.on("update-user", updateUser);

    return () => socket.off("receive-comment");
  }, [socket]);

  const updateUser = (user) => {
    disptach(updateFeedback(user.hasStar));
  };

  const addUsers = (users) => {
    setGroup(users);
  };

  const createGroup = () => {
    socket.emit("create-group", {
      userToken,
    });
  };

  const updateIndividualCluster = (cluster) => {
    socket.emit("update-individual-cluster", {
      userToken,
      cluster,
    });
  };

  const updateMovieFeedback = () => {
    socket.emit("update-movie-feedback", {
      userToken,
      hasStar: !hasStar,
    });
  };

  const incrementQuestionsAnswered = () => {
    socket.emit("inc-answered-questions", {
      userToken,
    });
  };

  const updateCluster = (cluster) => {
    socket.emit("update-cluster", {
      userToken,
      cluster,
    });
  };

  const getListOfUsers = () => {
    socket.emit("get-list-users", {
      groupToken,
    });
  };

  const getGroupMovie = (users) => {
    setClusters(users.map((el) => el.cluster));
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
        updateCluster,
        clusters,
        updateMovieFeedback,
        hasStar,
        updateIndividualCluster,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}
