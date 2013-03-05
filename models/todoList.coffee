
mongoose = require 'mongoose'

# TODO: set to to environment variable
mongoose.connect 'mongodb://nodejitsu:d6137cb96616aeb51efdb019997d12b1@linus.mongohq.com:10049/nodejitsudb231477816'

todoListSchema = new mongoose.Schema
    todos: [
        title: String,
        completed: Boolean
    ],

TodoList = mongoose.model 'TodoList', todoListSchema, 'todolists'

module.exports = TodoList
