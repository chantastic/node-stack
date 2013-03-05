
assert  = require 'assert'
request = require 'request'
app     = require '../../server'

describe "index", ->
    describe "GET /", ->
        body = null

        before (done) ->
            options =
                uri: "http://localhost:3001/" # XXX: set with global environment variable
            request options, (err, res, _body) ->
                body = _body
                done()

        it "should have a body", ->
            assert.ok body, 'no body response was sent'

        # TODO: More integration tests
