import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../index.js';
import testData from './testData/sampleTodos.js';
import Todo from '../src/models/todo.model.js';

const { todosToImport, wellFormedTodo, todoNoDescription, todoBadDate, todoNoDate, todoNoCompleted, todoToEdit, todoToEditBigId, todoToEditInvalidId } = testData;

chai.use(chaiHttp);

describe('Testing requests on database', () => {
   
    const testServer = chai.request(server).keepOpen();

    beforeEach(async () => {
        try {
            await Todo.deleteMany();
            console.log(`Database cleared`);
        } catch (error) {
            console.log(`Error clearing`);
            throw new Error();
        };
        try {
            await Todo.insertMany(todosToImport);
            console.log(`Database populated with test Todos`);
        } catch (error) {
            console.log(error.message);
            console.log(`Error inserting`);
            // Terminate the test
            throw new Error();
        };
    });

    describe(`/GET todos`, () => {

        it(`should return all of the todos as an array`, async () => {

            const res = await testServer
                .get(`/todos`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(todosToImport.length);
        });
    });

    describe(`/POST create a todo`, () => {
        it(`should not create a todo without a description field`, async () => {

            const res = await testServer
                .post(`/todos`)
                .send(todoNoDescription);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should not create a todo without a date`, async () => {

            const res = await testServer
                .post(`/todos`)
                .send(todoNoDate);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should not create a todo without a date`, async () => {

            const res = await testServer
                .post(`/todos`)
                .send(todoBadDate);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should not create a todo without a completed field`, async () => {

            const res = await testServer
                .post(`/todos`)
                .send(todoNoCompleted);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should create a todo that is properly formed`, async () => {

            const res = await testServer
                .post(`/todos`)
                .send(wellFormedTodo)

            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
            expect(res.body.todo).to.have.property(`todoDescription`, wellFormedTodo.todoDescription);
        });
    });

    describe(`/PUT/:_id update existing todo`, () => {
        it(`should update a todo with PUT for the given id`, async () => {

            const res = await testServer
                .put(`/todos/${todoToEdit._id}`)
                .send(todoToEdit);

            expect(res).to.have.status(201);
            expect(res.body.todo).to.have.property(`todoDescription`, todoToEdit.todoDescription);
            expect(res.body.todo).to.have.property(`todoCompleted`, true);
        });

        it(`should return a 404 error if the todo to edit's id from the url cannot be not found`, async () => {
            const res = await testServer
                .put(`/todos/${todoToEditBigId._id}`)
                .send(todoToEditBigId);

            expect(res).to.have.status(404);
            expect(res.text).to.be.eql(`That todo cannot be found`);
        });

        it(`should return a 422 error if the todo to edit's id from the url is not valid ID`, async () => {
            const res = await testServer
                .put(`/todos/${todoToEditInvalidId._id}`)
                .send(todoToEditInvalidId);

            expect(res).to.have.status(422);
            expect(res.text).to.be.eql(`Update not possible`);
        });
    });
});