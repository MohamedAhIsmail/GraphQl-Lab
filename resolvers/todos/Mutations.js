import mongoose from "mongoose";
import todoModel from "../../models/todos.js";

const todoMutations = {
  async add(_, { todo }, context) {
    try {
      if (!todo.title) {
        console.log(error.message);
      }

      todo.userId = context.id;

      const newTodo = await todoModel.create(todo);
      return newTodo;
    } catch (error) {
      console.log(error.message);
    }
  },
  async update(_, { id, todo }, context) {
    try {
      if (!id) {
        throw new Error(" required ID");
      }
      todo.userId = new mongoose.Types.ObjectId(context.id);

      const updatedTodo = await todoModel.findByIdAndUpdate(id, todo, {
        new: true,
      });
      return updatedTodo;
    } catch (error) {
      console.log(error.message);
    }
  },
  async delete(_, { id }, context) {
    try {
      const todo = await todoModel.findById(id);
      if (!todo) {
        throw new Error("Todo not found!");
      } else if (todo.userId.toString() !== context.id) {
        throw new Error("Unauthorized delete");
      } else {
        await todoModel.findByIdAndDelete(id);
        return todo;
      }
    } catch (error) {
      console.log(error.message);
    }
  },
};

export default todoMutations;