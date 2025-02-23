import userModel from "../../models/users.js";

const userQueries = {
  async getAllUsers() {
    try {
      const users = await userModel.find();
      return users;
    } catch (error) {
      throw new Error(`Error fetching users: ${error}`);
    }
  },
  async getUserById(_, { id }) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error}`);
    }
  },
};

export default userQueries;