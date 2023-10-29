const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000; // You can choose any available port

app.use(cors());

app.get('/products', async (req, res) => {
    const consumerKey = 'YOUR_CONSUMER_KEY'; // Replace with your Consumer Key
    const consumerSecret = 'YOUR_CONSUMER_SECRET'; // Replace with your Consumer Secret
    const url = 'http://rainydays.local/wp-json/wc/store/products'; // Your WooCommerce API URL

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const productsData = await response.json();
        res.json(productsData);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'An error occurred while fetching products.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
