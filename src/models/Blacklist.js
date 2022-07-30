const {Schema, model, Types} = require('mongoose')

const blacklistSchema = new Schema({
    token : {type : String}
})

const Blacklist = model('Blacklist', blacklistSchema)
exports.Blacklist = Blacklist