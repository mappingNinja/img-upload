'use strict';
require('dotenv').config();
const cors = require('cors')
const express = require("express");
var bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const serverless = require('serverless-http')
const uploadRouter = require('./routes/upload');
const error = require('./errors/error');
const PORT = process.env.PORT || 4000;
const app = express();

const router = express.Router();
// Middlewares
app.use(express.json())
app.use(bodyParser.json());
router.use(fileUpload());
// app.use(express.static('public'));
router.use(express.static('public'));

app.use(cors());

// test API
router.get('/', (req, res) => {
  res.send('Api is working!')
})

app.get('/', (req, res) => {
  res.send('Api is working!')
})

router.use('/api/file', uploadRouter);
router.use(error);

app.use(`/.netlify/functions/server`, router)
// app.use(error);

app.listen(PORT, () => {
  console.log('Server is Running on : ', PORT)
})

module.exports = app;
module.exports.handler = serverless(app);
