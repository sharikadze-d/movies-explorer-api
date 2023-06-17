require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes/index');

const { PORT, DB_PATH } = process.env;
const { PORT_DEV, DB_PATH_DEV } = require('./utils/constants');
const { isProduction } = require('./utils/utils');
const { createUser, login } = require('./controllers/users');
const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { createUserValidation, loginValidation } = require('./middlewares/validation');

const app = express();

app.use(cors());
app.use(limiter);

mongoose.connect(isProduction() ? DB_PATH : DB_PATH_DEV);

app.use(express.json());
app.use(requestLogger);
app.use(helmet());

app.use('/signup', createUserValidation, createUser);
app.use('/signin', loginValidation, login);
app.use(auth, router);

app.use(errorLogger);

app.use(errors());
app.use(handleError);

app.listen(isProduction() ? PORT : PORT_DEV);
