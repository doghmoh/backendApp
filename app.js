const express = require('express');
const app = express();
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
const cors = require('cors');
app.use(cors());
app.set('view engine', 'pug'); // Set the view engine
app.set('views', __dirname + '/views'); // Set the directory for your views

// Import your functions
const fetchWebhook = require('./fetchWebhook');
const pushUltrmsg = require('./pushUltramsg');

app.get('/' , (req,res) => {
  res.json({'message' : 'ok'})
})
app.get('/api/v1/test', (req, res) => {
      res.json({'message': 'ok'})
})
app.get('/api/v1/notification', async (req, res) => {

  const receivedData = req.body;
  console.log(receivedData)

  try {
   // const ultramsgResponse = await pushUltrmsg(receivedData.utlramsgURL, receivedData.ultramsgKEY, receivedData.destination, receivedData);

    // Handle responses as needed
    res.json({ message: 'success', receivedData });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const port = 8080;
app.listen(port, () => {
  console.log(`Webhook server is running on port ${port}`);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


 // const webhookData = await fetchWebhook(receivedData.webhookURL, receivedData.webhookKEY);