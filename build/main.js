import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { sequelize } from './data-access/index.js';
import userRouter from './routes/userRoute.js';
const app = express();
const port = process.env.PORT || 3030;
app.use(cors());
app.use(express.json());
app.use(userRouter);
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