/*global todomvc*/
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persist the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
todomvc.controller('TodoCtrl', function TodoCtrl($scope, $location, todoStorage, socket, filterFilter) {
    var todoList = null,
        todos    = [];

    socket.on('todoList:changed', function (data) {
        todoList = data;
        todos    = $scope.todos = todoList.todos;
    });

    $scope.newTodo = '';
    $scope.editedTodo = null;

    $scope.$watch('todos', function () {
        $scope.remainingCount = filterFilter(todos, {completed: false}).length;
        $scope.doneCount = todos.length - $scope.remainingCount;
        $scope.allChecked = !$scope.remainingCount;
        // todoStorage.put(todos);
    }, true);

    if ($location.path() === '') {
        $location.path('/');
    }
    $scope.location = $location;

    $scope.$watch('location.path()', function (path) {
        $scope.statusFilter = (path === '/active') ?
            { completed: false } : (path === '/completed') ?
            { completed: true } : null;
    });

    $scope.addTodo = function () {
        if (!$scope.newTodo.length) {
            return;
        }

        todos.push({
            title: $scope.newTodo,
            completed: false
        });

        updateTodos();

        $scope.newTodo = '';
    };

    $scope.editTodo = function (todo) {
        $scope.editedTodo = todo;
    };

    $scope.doneEditing = function (todo) {
        $scope.editedTodo = null;
        if (!todo.title) {
            $scope.removeTodo(todo);
        }

        updateTodos();
    };

    $scope.removeTodo = function (todo) {
        todos.splice(todos.indexOf(todo), 1);

        updateTodos();
    };

    $scope.clearDoneTodos = function () {
        $scope.todos = todos = todoList.todos = todoList.todos.filter(function (val) {
            return !val.completed;
        });

        updateTodos();
    };

    $scope.toggleDone = function (todo) {
        todo.completed = !todo.completed;

        updateTodos();
    };

    $scope.markAll = function (done) {
        todos.forEach(function (todo) {
            todo.completed = done;
        });

        updateTodos();
    };

    var updateTodos = function () {
        socket.emit('todoList:changed', todoList);
    }
});
