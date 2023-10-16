const testData = {
    todosToImport: [
        {
            _id: "64fae1c955336b356b85f114",
            todoDescription: "Test 1-imported",
            todoDate_created: "2019-05-27T00:00:00.000Z",
            todoCompleted: false
        },
        {
            _id: "64fae1c955336b356b85f115",
            todoDescription: "Test 2-imported",
            todoDate_created: "2019-05-27T00:00:00.000Z",
            todoCompleted: false
        }
    ],
    wellFormedTodo: {
        todoDescription: "Well Formed Todo",
        todoDateCreated: "2019-05-27T00:00:00.000Z",
        todoCompleted: false
    },
    todoNoDescription: {
        todoDateCreated: "2019-05-27T00:00:00.000Z",
        todoCompleted: false
    },
     todoBadDate: {
        todoDescription: "Todo with no Date",
        todoDateCreated: "Bad date",
        todoCompleted: false
    },
    todoNoDate: {
        todoDescription: "Todo with no Date",
        todoCompleted: false
    },
    todoNoCompleted: {
        todoDescription: "Todo with no Completed",
        todoDateCreated: "2019-05-27T00:00:00.000Z",
    },
    todoToEdit: {
        _id: "64fae1c955336b356b85f114",
        todoDescription: "Test 1-edited",
        todoDateCreated: "2019-05-27T00:00:00.000Z",
        todoCompleted: true
    },
    todoToEditBigId: {
        _id: "64fae1c955336b356b85f122",
        todoDescription: "todo to edit with unfindable int id",
        todoDateCreated: "2019-05-27T00:00:00.000Z",
        todoCompleted: true
    },
    todoToEditInvalidId: {
        _id: "NotAnId",
        todoDescription: "Todo with invalid value for id",
        todoDateCreated: "2019-05-27T00:00:00.000Z",
        todoCompleted: true
    },
};

export default testData;