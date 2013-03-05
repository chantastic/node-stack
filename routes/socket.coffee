
socket = (io) ->

    io.sockets.on 'connection', (socket) ->

        TodoList = require '../models/todoList'

        # Initial todoList
        TodoList.findOne {}, (err, todoList) ->
            socket.emit 'todoList:changed', todoList

        # Listen for updates
        socket.on 'todoList:changed', (data) ->

            # Update DB
            TodoList.update { _id: data._id }, { $set: { todos: data.todos } }, (err) ->
                if not err

                    # Broadcast update to all sockets but this one
                    socket.broadcast.emit 'todoList:changed', (data)

module.exports = socket
