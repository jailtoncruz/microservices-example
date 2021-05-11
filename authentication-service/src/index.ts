import express, { json } from 'express';
import cors from 'cors';

import routes from './routes';

const PORT = 3330;

const app = express();

app.use(cors());
app.use(json());

app.use(routes);

app.listen(PORT, () => {
    console.info(`Server listen port ${PORT}.`)
})