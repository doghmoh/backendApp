const axios = require('axios');

async function pushUltrmsg(ultramsgURL, ultramsgKEY, destination, webhookData) {
  console.log('sdsdsd' + ultramsgURL+ ultramsgKEY,destination,webhookData);
  
  const config = {
    method: 'post', // Assuming you want to send data via POST
    url: ultramsgURL,
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      token: ultramsgKEY,
      to: destination,
      body: webhookData, // Use the data received from createWebhook
    },
  };
  try {
    const response = await axios(config);

    console.log('fine  ............')
    return response.data;
  } catch (error) {
    console.error('Error pushing to Ultramsg:', error);

    if (error.response) {
      // The request was made, but the server responded with a status code that falls out of the range of 2xx
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      // The request was made, but no response was received (ECONNREFUSED or network error)
      console.error('No response received.');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error message:', error.message);
    }

    throw error; // You can handle different types of errors based on your needs
  }
}

module.exports = pushUltrmsg;