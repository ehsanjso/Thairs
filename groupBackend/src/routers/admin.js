const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
const User = require("../models/users");
const Video = require("../models/videos");
const Comment = require("../models/comments");
const Discussion = require("../models/discussions");
const Log = require("../models/logs");
const Heuristic = require("../models/heuristics");

const sidebarGroups = {
  user: {
    name: "User Management",
    icon: "User",
  },
  log: {
    name: "Logs Management",
    icon: "Catalog",
  },
};

AdminBro.registerAdapter(AdminBroMongoose);
const adminBro = new AdminBro({
  resources: [
    {
      resource: User,
      options: {
        parent: sidebarGroups.user,
      },
    },

    {
      resource: Log,
      options: {
        parent: sidebarGroups.log,
      },
    },
  ],
  rootPath: "/admin",
  branding: {
    companyName: "COUX Admin",
    softwareBrothers: false,
  },
});
const adminRouter = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || "grecom-admin",
  cookiePassword: process.env.ADMIN_COOKIE_PASS || "grecom-admin-pass",
  authenticate: async (email, password) => {
    const user = await User.findByCredentials(email, password);
    if (user) {
      if (user.isAdmin && user.isVerified) {
        return user;
      }
      return null;
    }
    return null;
  },
});

module.exports = { adminBro, adminRouter };
