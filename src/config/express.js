const express = require('express')
const bodyParser = require('body-parser')

module.exports = (app) => {
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended:true}))
    app.use(express.json())
    app.use(bodyParser.urlencoded({extended: 'true'}))
    
}