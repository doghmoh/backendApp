const express = require('express');
const app = express();
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(session({
  secret: '0000000000x', // Replace with your own secret key
  resave: false,
  saveUninitialized: true,
}));
// Use the cookie-parser middleware
app.use(cookieParser());
const cors = require('cors');
app.use(cors());
app.set('view engine', 'pug'); // Set the view engine
app.set('views', __dirname + '/views'); // Set the directory for your views

// Import your functions
const fetchWebhook = require('./fetchWebhook');
const pushUltrmsg = require('./pushUltramsg');

app.get('/', (req, res) => {
  res.json({ 'message': 'ok' })
})
app.get('/api/v1/test', (req, res) => {
  res.json({ 'message': 'ok' })
})
app.post('/api/v1/notification', async (req, res) => {
  req.session.savedRequest = req

  res.send('Data: ', req.session.savedRequest);
});
app.get('/cookies', (req, res) => {
  const jsonCookieValue = req.cookies.receivedData;
  if (jsonCookieValue) {
    const receivedData = JSON.parse(jsonCookieValue);
    res.json(receivedData);
  } else {
    res.status(404).json({ message: 'No received data found in the cookie' });
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