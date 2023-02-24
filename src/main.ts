import app from './app.js';
import db from './models/index.js';
import { logger } from './utils/loggers.js';

const { sequelize } = db;

const port = process.env.PORT || 3030;

sequelize
  .sync({ force: false })
  .then(async () => {
    logger.info('Connected to DB ...');
    app.listen(port, () => {
      logger.info(`Example app listening on port ${port} ...`);
    });
  })
  .catch((error: any) => logger.error(`Failed to connect to DB: ${error}`));
