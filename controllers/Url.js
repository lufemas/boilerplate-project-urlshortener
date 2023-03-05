const mongoose = require('mongoose');
const Url = require('../models/Url');

const createAndSaveUrl = async (originalUrl) => {
  const last = Url.find().limit(1).sort({ $natural: -1 })

  console.log('last: ', last.original_url)
  const url = new Url({ original_url: originalUrl, short_url: last.short_url + 1 || 0 });
  return await url.save();
};

module.exports = { createAndSaveUrl };
