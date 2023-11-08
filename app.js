const express = require('express');
const app = express();
app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true })); // For URL-encoded data
const cookieParser = require('cookie-parser');
const session = require('express-session');
const axios = require('axios');
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

// app.get('/', async (req, res) => {
//   const data = {
//     message: 'Hello, world!',
//     sender: 'Your Name'
//   };
  
//   fetch('http://localhost:8080/api/v1/notification', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       res.json({'m' : "ok2121"})
//     })
//     .catch(error => {
//       res.json({'m' : error})
//     });
// });

app.get('/api/v1/test', (req, res) => {
  res.json({ 'message': 'ok' })
})
app.post('/api/v1/notification', (req, res) => {
  // Save the entire request body in the session
  //req.session.requestData = req.body;
  const requestInfo = JSON.stringify(req);
  // Access the saved request data from the session
 // const requestData = req.session.requestData;

  // Display the saved request data
  console.log(requestInfo);

  res.json({ message: 'Request data saved in the session', requestInfo });
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