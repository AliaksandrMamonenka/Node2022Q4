import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './models/index.js';
import userRouter from './routes/userRoute.js';
import groupRouter from './routes/groupRoute.js';
import { errorLogMid, infoLogMid, logger } from './utils/loggers.js';
import errorHandler from './middleware/errorHandler.js';
// import customLogger from './middleware/customLogger.js';

const { sequelize } = db;
dotenv.config();

const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());

// app.use(customLogger);

// express-winston logger makes sense BEFORE the router
app.use(infoLogMid);

app.use(userRouter);
app.use(groupRouter);

// express-winston errorLogger makes sense AFTER the router
app.use(errorLogMid);

app.use(errorHandler);

// process.on('uncaughtException', (error) => {
//   logger.error(`Task5.2 - Uncaught Exception: ${error.message}`);
//   // process.exit(1);
// });

// process.on('unhandledRejection', (error: any, promise) => {
//   logger.error('Task5.2 - Unhandled rejection at ', promise, `reason: ${error.message || error.stack}`);
//   // process.exit(1);
// });

app.get('/', (req, res) => {
  res.send('Main Page');
});

sequelize
  .sync({ force: false })
  .then(async () => {
    logger.info('Connected to DB ...');
    app.listen(port, () => {
      logger.info(`Example app listening on port ${port} ...`);
      logger.info(`Example app listening on port ${port} ...`);
    });
  })
  .catch((error: any) => logger.error(`Failed to connect to DB: ${error}`));
