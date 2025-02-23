import userModel from "../../models/users.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userMutations = {
  async register(_, { user }) {
    try {
      if (!user.name || !user.email || !user.password) {
        throw new Error("User name, email, and password are required");
      }
  
      const existingUser = await userModel.findOne({ email: user.email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }
  
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      const newUser = await userModel.create({
        ...user,
        password: hashedPassword,
      });
  
      console.log("New user created:", newUser);
  
      return newUser;
    } catch (error) {
      console.error("Error in register:", error.message);
      throw new Error(error.message);
    }
  },
  

  async login(_, { user }) {
    try {
      const { email, password } = user;

      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const foundedUser = await userModel.findOne({ email });
      if (!foundedUser) {
        throw new Error("User not found!");
      }

      const isMatch = await bcrypt.compare(password, foundedUser.password);
      if (!isMatch) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign(
        { id: foundedUser._id },
        process.env.SECRET
      );

      return token;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default userMutations;