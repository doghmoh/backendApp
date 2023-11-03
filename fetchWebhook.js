const axios = require('axios');

async function fetchWebhook(webhookURL, webhookKEY) {
  console.log('lunch wobhookfetching ')
  const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        "event": "app.store.authorize",
        "merchant": 1234509876,
        "created_at": "2022-12-31 12:31:25",
        "data": {
          "access_token": "KGsnBcNNkR2AgHnrd0U9lCIjrUiukF_-Fb8OjRiEcog.NuZv_mJaB46jA2OHaxxxx",
          "expires": 1634819484,
          "refresh_token": "fWcceFWF9eFH4yPVOCaYHy-UolnU7iJNDH-dnZwakUE.bpSNQCNjbNg6hTxxxx",
          "scope": "settings.read branches.read offline_access",
          "token_type": "bearer"
        }
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