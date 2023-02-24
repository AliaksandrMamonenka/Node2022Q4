import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { userRouter, groupRouter } from './routes/index.js';
import { errorWinstonLogger, infoWinstonLogger } from './utils/loggers.js';
import errorHandler from './middleware/errorHandler.js';
import checkAuthorization from './middleware/checkAuthorization.js';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  }),
);

app.use(checkAuthorization);

// express-winston logger makes sense BEFORE the router
app.use(infoWinstonLogger);

app.use(userRouter);
app.use(groupRouter);

app.use(errorHandler);

// express-winston errorLogger makes sense AFTER the router
app.use(errorWinstonLogger);

app.get('/', (req, res) => {
  res.send('Main Page');
});

export default app;
