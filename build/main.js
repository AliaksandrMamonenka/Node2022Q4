import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
import userRouter from './routes/userRoute.js';
import groupRouter from './routes/groupRoute.js';
const { sequelize } = db;
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());
app.use(userRouter);
app.use(groupRouter);
app.get('/', (req, res) => {
    res.send('Main Page');
});
sequelize
    .sync({ force: false })
    .then(async () => {
    console.log('Connected to DB ...');
    app.listen(port, () => {
        console.log(`Example app listening on port ${port} ...`);
    });
})
    .catch((err) => console.log(`Failed to connect to DB: ${err}`));
//# sourceMappingURL=main.js.map