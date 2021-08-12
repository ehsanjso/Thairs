const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
    groupToken: {
      type: String,
    },
    question: {
      type: Number,
    },
    cluster: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  return userObject;
};

userSchema.statics.findByCredentials = async (token) => {
  const user = await User.findOne({ token });

  if (!user) {
    throw new Error("Unable to login");
  }

  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
