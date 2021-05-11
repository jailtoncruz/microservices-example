import express, { json } from 'express';
import cors from 'cors';
import os from 'os';
import LoggerController, { Controllers } from './controllers/LoggerController';

import api from './services/main';

const ifaces = os.networkInterfaces();
const PORT = 3332;

const app = express();
const logger = new LoggerController();

app.use(cors());
app.use(json());

app.get("/logger", logger.index)
app.post("/logger", logger.write)

app.listen(PORT, () => {
    logger.writeLocal(Controllers.LoggerService, `Server listen port ${PORT}.`);
    let addressAvaliables: Array<string> = []
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname]?.forEach(function (iface) {
            if (iface.family === "IPv4" && !iface.address.startsWith('127')) addressAvaliables.push(iface.address);
        })
    })
    api.post("/main/logger", { path: `http://${addressAvaliables[0]}:${PORT}` })
})