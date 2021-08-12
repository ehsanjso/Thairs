const { generateComment } = require("../utils/comments");
const R = require("ramda");
const Log = require("../models/logs");
const User = require("../models/users");

module.exports = function (socket, io) {
  const socketId = socket.handshake.query.groupToken;
  socket.join(socketId);
  console.log(`new connection id=${socketId}!`);

  socket.on("create-group", async ({ userToken }) => {
    console.log("--------------");
    console.log(userToken);
    if (userToken) {
      const user = await User.findByCredentials(userToken);
      user.groupToken = socketId;
      await user.save();
      io.to(socketId).emit("group-created");
    }
  });

  socket.on("get-list-users", async ({ groupToken }) => {
    console.log("--------------");
    console.log(groupToken);
    if (groupToken) {
      const users = await User.find({});
      const res = users.filter((el) => el.groupToken === groupToken);
      console.log(users);
      io.to(socketId).emit("receive-group-users", res);
    }
  });

  socket.on("start", async () => {
    io.to(socketId).emit("start-recom");
  });

  // socket.on("delete-heuristic", async ({ heuristicId }) => {
  //   const discussion = await Heuristic.findById(heuristicId);
  //   await discussion.remove();
  //   io.to(socketId).emit("remove-heuristic", heuristicId);
  // });

  // socket.on("log", async (data) => {
  //   const newLog = new Log(data);
  //   newLog.save();
  // });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
};
