require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Url = require('./models/Url');
const urlController = require('./controllers/Url');

// Basic Configuration
const port = process.env.PORT || 3000;

const shortUrls = [];

mongoose.connect(process.env.MONGO_URI);

app.use(cors());

app.use(bodyParser());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// POST endpoint
app.post('/api/shorturl', async function(req, res) {
  // res.json({ greeting: 'hello API' });
  const originalUrl = req.body.url;
  const isValidUrl = /^https:\/\/.+[.].{2,}$/.test(originalUrl);

  if (!isValidUrl) res.json({ error: 'invalid url' });

  const urlId = shortUrls.push(originalUrl);
  const result = await urlController.createAndSaveUrl(originalUrl);

  console.log('result: ', result);
  console.log(shortUrls)
  res.json({
    original_url: originalUrl,
    short_url: urlId
  });

});

app.get('/api/shorturl/:id', (req, res) => {
  const urlId = req.params.id;
  console.log('shortUrls: ', shortUrls)
  console.log('urlId: ', urlId)
  console.log('shortUrls[urlId]: ', shortUrls[urlId])
  res.redirect(shortUrls[urlId]);
  // res.redirect('https://www.google.com');
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
