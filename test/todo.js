import Todo from '../src/models/todo.model.js';

import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';

import server from '../server.js';
import testData from './testData/sampleTodos.js';
const testDataArray = testData.todos;

chai.use(chaiHttp);

describe(`Testing requests on the database`, () => {

    // Servers are stateless so we can create and keep it open here and make requests to testServer in tests
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
            await Todo.insertMany(testDataArray);
            console.log(`Database populated with test Todos`);
        } catch (error) {
            console.log(`Error inserting`);
            // Terminate the test
            throw new Error();
        };
    });

    describe(`/GET todos`, () => {

        it(`should return all of the todos as an array`, async () => {
            const res = await testServer
                .get(`/`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.be.an(`array`);
            expect(res.body.length).to.equal(testDataArray.length);
        });

        // TODO: What happens if no todos come back?
    });

    describe(`/POST create a todo`, () => {
        it(`should not create a todo without a description field`, async () => {
            let todo = {
                todoDateCreated: `2019-05-27T00:00:00.000Z`,
                todoCompleted: false
            };

            const res = await testServer
                .post(`/add`)
                .send(todo);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should not create a todo without a description field`, async () => {
            let todo = {
                todoDescription: `No date todo`,
                todoDateCreated: `not a date`,
                todoCompleted: false
            };

            const res = await testServer
                .post(`/add`)
                .send(todo);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should not create a todo without a completed field`, async () => {
            let todo = {
                todoDescription: `No date todo`,
                todoDateCreated: `not a date`,
            };

            const res = await testServer
                .post(`/add`)
                .send(todo);

            expect(res).to.have.status(422);
            expect(res).to.have.property(`error`);
            expect(res.text).to.be.eql(`Adding new todo failed`);
        });

        it(`should create a todo that is properly formed`, async () => {
            let todo = {
                todoDescription: `A test todo`,
                todoDateCreated: `2019-05-27T00:00:00.000Z`,
                todoCompleted: false
            };

            const res = await testServer
                .post(`/add`)
                .send(todo)

            expect(res).to.have.status(201);
            expect(res.body).to.be.an(`object`);
            expect(res.body.todo).to.have.property(`todoDescription`, todo.todoDescription);
        });
    });

    describe(`/GET/:id todo`, () => {
        it(`should GET a todo by the given id`, async () => {
            const testId = testDataArray[0]._id;
            const res = await testServer
                .get(`/todo/${testId}`)
                .send();

            expect(res).to.have.status(200);
            expect(res.body).to.have.property(`_id`, testId);
        });
    });

    describe(`/PUT/:id update existing todo`, () => {
        it(`should update a todo with PUT for the given id`, async () => {
            const todoToUpdate = testDataArray[0];
            todoToUpdate.todoCompleted = true;

            const res = await testServer
                .put(`/todo/${todoToUpdate._id}`)
                .send(todoToUpdate);

            expect(res).to.have.status(201);
            expect(res.body.todo).to.have.property(`_id`, todoToUpdate._id);
        });

        it(`should return a 404 error if the todo to update's id from the url is not found`, async () => {
            const res = await testServer
                .put(`/todo/notAnId`)
                .send(testDataArray[0]);

            expect(res).to.have.status(404);
            expect(res.text).to.be.eql(`That todo cannot be found`);
        });
    });

});