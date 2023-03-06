const mongoose = require('mongoose');
const Url = require('../models/Url');

const createAndSaveUrl = async (originalUrl) => {
  const last = await Url.find().limit(1).sort({ $natural: -1 })
  const shortUrl = last ? last.short_url + 1 : 0 ;
  const url = new Url({ original_url: originalUrl, short_url: shortUrl });
  return await url.save();
};

const getByShortUrl = async (shortUrl) => {
  const url = await Url.find({ short_url: shortUrl }).limit(1);
  console.log('url get: ', url.original_url)
  return url;
};

module.exports = { createAndSaveUrl, getByShortUrl };
