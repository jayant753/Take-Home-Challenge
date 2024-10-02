import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  description: String,
  status: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});

const projectSchema = new mongoose.Schema({
  title: String,
  todos: [todoSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
