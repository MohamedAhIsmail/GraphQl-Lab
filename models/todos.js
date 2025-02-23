import mongoose from "mongoose";

let todosSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "title must be unique"],
      minLength: 3,
      maxLength: 20,
    },
    status: {
      type: String,
      enum: ["todo", "in progress", "done"],
      default: "todo",
    },
    time: Date,
    userID: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const todoModel = mongoose.model("Todo", todosSchema);

export default todoModel
