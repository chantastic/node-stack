
routes = (app) ->

    app.get '/', (req, res) ->
        res.render 'index', {
            title: 'NodeJS Stack &middot; TodoMVC'
        }

module.exports = routes
