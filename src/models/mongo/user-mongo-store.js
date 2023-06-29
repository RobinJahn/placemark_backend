import { User } from "./user.js";

export const userMongoStore = {
  async getAllUsers() {
    const users = await User.find().lean();
    return users;
  },

  async getUserById(id) {
    if (id) {
      try {
        const user = await User.findOne({ _id: id }).lean();
        return user;
      } catch (error) {
        console.log("bad id");
      }
    }
    return null;
  },

  async addUser(user) {
    const newUser = new User(user);
    const userObj = await newUser.save();
    const u = await this.getUserById(userObj._id);

    return u;
  },

  async getUserByEmail(email) {
    const user = await User.findOne({ email: email }).lean();
    return user;
  },

  async deleteUserById(id) {
    try {
      return await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad id");
      return null;
    }
  },

  async deleteAllNonAdminUsers() {
    // delete all non admin users
    await User.deleteMany({ isAdmin: false });
  },

  async deleteAllUsers() {
    await User.deleteMany({});
  },

  async isAdmin(id) {
    const user = await this.getUserById(id);
    return user.isAdmin;
  },
};
