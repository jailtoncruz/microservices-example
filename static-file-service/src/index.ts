import express from 'express';
import cors from 'cors';
import path from 'path';

const PORT = 3331;

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "public")))

app.listen(PORT, () => {
    console.info(`Service listen port ${PORT}.`)
})