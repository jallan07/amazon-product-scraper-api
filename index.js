const express = require('express')
const request = require('request-promise')

const app = express()
const PORT = process.env.PORT || 8956

const generateScraperURL = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=tru`

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Amazon Scraper API!')    
})

// get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params.productId
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params.productId
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params.productId
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// get search results
app.get('/search/:query', async (req, res) => {
    const { query } = req.params.query
    const { api_key } = req.query

    try {
        const response = await request(`${generateScraperURL(api_key)}&url=https://www.amazon.com/s?k=${query}`)
        res.json(JSON.parse(response))
    } catch (error) {
        res.json(error)
    }
})

// set the server to listen on the port
app.listen(PORT, ()=> console.log(`Server listening on http://localhost:${PORT}`))