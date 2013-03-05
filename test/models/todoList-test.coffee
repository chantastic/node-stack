
assert   = require 'assert'
TodoList = require '../../models/todoList'

describe "TodoList", ->

    describe 'create', ->
        todoList = null
        before ->
            todoList = new TodoList {todos: [
                title: "One",
                completed: false,
                    title: "Two",
                    completed: true,
                        title: "Three",
                        completed: true
            ]}

        it "should generate an id", ->
            assert.ok todoList._id, "No id is assigned"

        it "should have a 'todos' Array", ->
            assert.ok todoList.todos, "No 'todos' Array"

        describe 'todos', ->

            it "should contain 3 'todos'", ->
                assert.equal 3, todoList.todos.length, "There were not exactly 3 items in the 'todos' Array"

            describe 'first todo', ->

                it "should be named 'One'", ->
                    assert.equal "One", todoList.todos[0].title, "First todo's title is not 'One'"

                it "should be incomplete", ->
                    assert.ok !todoList.todos[0].completed, "First todos is already completed"

            describe 'second todo', ->

                it "should be named 'Two'", ->
                    assert.equal "Two", todoList.todos[1].title, "First todo's title is not 'Two'"

                it "should be copmlete", ->
                    assert.ok todoList.todos[1].completed, "First todos is not complete"
