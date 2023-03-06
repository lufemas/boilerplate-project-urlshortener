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

  if (!isValidUrl) {
    console.log('It is not a valid URL, originalUrl:', originalUrl);
    return res.json({ error: 'invalid url' })
  };
  console.log('It a valid URL, originalUrl:', originalUrl);

  const result = await urlController.createAndSaveUrl(originalUrl);

  res.json({
    original_url: result.original_url,
    short_url: result.short_url
  });

});

app.get('/api/shorturl/:id', async (req, res) => {
  const urlId = req.params.id;
  const url = await urlController.getByShortUrl(urlId);
  res.redirect(url.original_url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
