const express = require('express');
const bodyParser = require('body-parser');
const stripe = require('stripe')('sk_test_51PPcjqIDAVZnXYPhUJvHGJ5EGQnddEbNPrMvvy91z79qg8UdPcuxtJuwnZe2un8MRwDELDcw1vwLBcwkBt3nRpdw00QPkckusE');

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));  // Serve static files from 'public' directory

app.post('/create-payment-intent', async (req, res) => {
    const { paymentMethodId } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000, // amount in cents
            currency: 'usd',
            payment_method: paymentMethodId,
            confirm: true,
        });
        res.send({ success: true });
    } catch (error) {
        res.send({ error: error.message });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));
