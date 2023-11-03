const axios = require('axios');

async function fetchWebhook(webhookURL, webhookKEY) {
  console.log('lunch wobhookfetching ')
  const options = {
       method: 'POST',
      url: 'https://demo.salla.sa/orders',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer 91210eef3073c5910cd68556c0ef7ed7'
      },
      data: {
        name: 'Order Updated Webhook with Payment',
        event: 'order.updated',
        version: '2',
        rule: 'payment_method = mada',
        url: 'https://demo.salla.sa/orders',
        security_strategy: 'token',
        secret: '91210eef3073c5910cd68556c0ef7ed7'
      }
    

  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error; // Handle errors at a higher level
  }
}

module.exports = fetchWebhook;