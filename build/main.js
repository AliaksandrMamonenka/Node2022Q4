import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 3030;
app.use(express.json());
app.use(userRouter);
app.get('/', (req, res) => {
    res.send('Main Page');
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=main.js.map