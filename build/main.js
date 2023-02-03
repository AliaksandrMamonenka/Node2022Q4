import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import userRouter from './routes/userRoute.js';
import groupRouter from './routes/groupRoute.js';
import { errorLogMid, infoLogMid, logger } from './utils/loggers.js';
import errorHandler from './middleware/errorHandler.js';
const { sequelize } = db;
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());
app.use(infoLogMid);
app.use(userRouter);
app.use(groupRouter);
app.use(errorLogMid);
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
        logger.info(`Example app listening on port ${port} ...`);
    });
})
    .catch((error) => logger.error(`Failed to connect to DB: ${error}`));
//# sourceMappingURL=main.js.map