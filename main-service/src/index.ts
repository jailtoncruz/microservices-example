import express, { json, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const PORT = 3333;

const app = express();

let services = {
    logger: "",
    static: "",
    users: "",
    main: "http://localhost:3333/"
}
const selectProxyHost = (req: Request): string => {
    if (req.path.startsWith('/users'))
        return services.users;
    else if (req.path.startsWith('/logger'))
        return services.logger;
    else if (req.path.startsWith('/main'))
        return services.main;
    else
        return services.static;
}

app.use(cors());
app.use(json());

app.get("/main", (req: Request, res: Response) => {
    return res.json(services);
})

app.post("/main/logger", (req: Request, res: Response) => {
    const { path } = req.body;
    services.logger = path;
    return res.json();
})

app.post("/main/static", (req: Request, res: Response) => {
    const { path } = req.body;
    services.static = path;
    return res.json();
})

app.post("/main/users", (req: Request, res: Response) => {
    const { path } = req.body;
    services.users = path;
    return res.json();
})

app.use((req: Request, res: Response, next: NextFunction) => {
    proxy(selectProxyHost(req))(req, res, next);
})

app.listen(PORT, () => {
    console.info(`Server listen port ${PORT}.`)
})