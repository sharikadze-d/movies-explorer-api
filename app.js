require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');

const { PORT, DB_PATH } = process.env;
const { PORT_DEV, DB_PATH_DEV } = require('./utils/constants');
const { isProduction } = require('./utils/utils');

const app = express();

mongoose.connect(isProduction() ? DB_PATH : DB_PATH_DEV);

app.listen(isProduction() ? PORT : PORT_DEV);
