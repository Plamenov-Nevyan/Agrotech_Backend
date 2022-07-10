const fetch = require('node-fetch')
// const newsUrl = `http://api.mediastack.com/v1/news?access_key=${process.env.MEDIASTACK_KEY}&keywords=agriculture&sources=cnn,bbc`
const newsUrl = `https://newsapi.org/v2/everything?q=+farming&language=en&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`

exports.getNews = () => fetch(newsUrl)