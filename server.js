const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});

app.post('/payment', async (req, res) => {
    try {
      const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: 'usd',
      description: 'Example charge'
    };
  
      const charge = await stripe.charges.create(body);
  
      res.status(200).json(charge);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// app.post('/payment', (req, res) => {
//     const body = {
//       source: req.body.token.id,
//       amount: req.body.amount,
//       currency: 'usd',
//       description: 'Example charge'
//     };
  
//     stripe.charges.create(body, (stripeErr, stripeRes) => {
//       if (stripeErr) {
//         res.status(500).send({ error: stripeErr });
//       } else {
//         res.status(200).send({ success: stripeRes });
//       }
//     });
//   });