const mongoose = require('mongoose');
const Url = require('../models/Url');

const createAndSaveUrl = async (originalUrl) => {
  const url = new Url({ original_url: originalUrl });
  return await url.save();
};

module.exports = { createAndSaveUrl };
