import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: [true, "Please enter title"],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Please enter description"],
    },
    priority: {
      type: String,
      enum: ["minor", "major", "critical"],
      default: "minor",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

todoSchema.pre("save", function (next) {
  this.slug = this.title.split(" ").join("-");
  next();
});

todoSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.title) {
    update.slug = update.title.split(" ").join("-");
  }
  next();
});

const Todo = mongoose.model("Todo", todoSchema);

export { Todo };
