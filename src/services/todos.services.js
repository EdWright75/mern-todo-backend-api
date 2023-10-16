import Todo from '../models/todo.model.js';

export const getAllTodosService = async () => {
    try {
        return await Todo.find({});
    }
    catch (e) {
        throw e;
    }
};

export const addTodoService = async todo => {
    try {
        const newTodo = new Todo(todo);
        return await newTodo.save();
    } catch (e) {
        throw e
    }
}

export const editTodoService = async (editedTodo, _id) => {
    const updatedTodo = { ...editedTodo };
    delete updatedTodo._id;

    try {
        const todo = await Todo.findByIdAndUpdate({ _id: _id }, updatedTodo, { runValidators: true });
        if (!todo) throw new Error(`Todo not found`);
        return await getTodoService(_id);
        
    }
    catch (e) {
        throw e;
    }
}

const getTodoService = async _id => {
    try {
        return await Todo.findById(_id);
    }
    catch (e) {
        throw e;
    }
}
