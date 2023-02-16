import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import db from './models/index.js';
import { userRouter, groupRouter } from './routes/index.js';
import { errorWinstonLogger, infoWinstonLogger, logger } from './utils/loggers.js';
import errorHandler from './middleware/errorHandler.js';
import checkAuthorization from './middleware/checkAuthorization.js';

const { sequelize } = db;
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: '*',
  }),
);

// express-winston logger makes sense BEFORE the router
app.use(infoWinstonLogger);
app.use(checkAuthorization);

app.use(userRouter);
app.use(groupRouter);

// express-winston errorLogger makes sense AFTER the router
app.use(errorWinstonLogger);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Main Page');
});

sequelize
  .sync({ force: false })
  .then(async () => {
    logger.info('Connected to DB ...');
    app.listen(port, () => {
      logger.info(`Example app listening on port ${port} ...`);
    });
  })
  .catch((error: any) => logger.error(`Failed to connect to DB: ${error}`));
