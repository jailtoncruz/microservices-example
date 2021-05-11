import express, { json } from 'express';
import cors from 'cors';
import os from 'os';

import routes from './routes';
import api from './services/main';

const PORT = 3330;
const ifaces = os.networkInterfaces()

const app = express();

app.use(cors());
app.use(json());

app.use(routes);

app.listen(PORT, () => {
    console.info(`Authentication Service listen port ${PORT}.`)
    let addressAvaliables: Array<string> = []
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname]?.forEach(function (iface) {
            if (iface.family === "IPv4" && !iface.address.startsWith('127')) addressAvaliables.push(iface.address);
        })
    })
    api.post("/main/users", { path: `http://${addressAvaliables[0]}:${PORT}` })
})