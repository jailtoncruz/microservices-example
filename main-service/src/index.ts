import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';
import morgan from 'morgan';

import routes from './routes';

const PORT = 3333;

const app = express();

const selectProxyHost = (req: Request): string => {
    if (req.path.startsWith('/users'))
        return 'http://localhost:3330/';
    else if (req.path.startsWith('/logger'))
        return 'http://localhost:3332/';
    else
        return 'http://localhost:3331/';

    return "http://localhost:3333"
}

app.use(cors());
app.use(json());
app.use(morgan('dev'))

app.use((req: Request, res: Response, next: NextFunction) => {
    proxy(selectProxyHost(req))(req, res, next);
})

app.use(routes);

app.listen(PORT, () => {
    console.info(`Server listen port ${PORT}.`)
})