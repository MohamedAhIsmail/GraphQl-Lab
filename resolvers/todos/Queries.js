import todoModel from "../../models/todos.js";

const todoQueries = {
  async getAllTodos() {
    try {
      const todos = await todoModel.find();
      return todos;
    } catch (error) {
      console.log(error.message);
    }
  },
  async getTodoById(_, { id }) {
    try {
      const todo = await todoModel.findById(id);
      if (!todo) {
        throw new Error(`Todo with ID ${id} not found`);
      }
      return todo;
    } catch (error) {
      console.log(error.message);
    }
  },
  async getTodosByUserId(_, { userId }) {
    try {
      if (!userId) {
        throw new Error("User ID is required");
      }
      const todos = await todoModel.find({ userId });
      return todos;
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default todoQueries;