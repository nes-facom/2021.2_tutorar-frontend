var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
var history = require('connect-history-api-fallback')
var app = express()

app.use(history({
    // verbose: true
}));

app.use(express.static(path.join(__dirname, 'dist')))

// var port = process.env.PORT || 3000
app.set('port',  (process.env.PORT || 8080))

app.listen(app.get('port'), () => {
    console.log('Servidor express web iniciado na porta ' + port)
})