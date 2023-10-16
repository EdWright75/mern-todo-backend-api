import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todoDescription: { type: String, required: true },
    todoDateCreated: {
        type: Date,
        default: Date.now,
        required: true
    },
    todoCompleted: { type: Boolean, required: true }
});

const Todo = mongoose.model(`Todo`, todoSchema);

export default Todo;