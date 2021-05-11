import express from 'express';
import cors from 'cors';
import path from 'path';
import os from 'os';
import api from './services/main';

const PORT = 3331;
const ifaces = os.networkInterfaces();

const app = express();

app.use(cors());

app.use(express.static(path.resolve(__dirname, "..", "public")))

app.listen(PORT, () => {
    console.info(`Static File Service listen port ${PORT}.`)
    let addressAvaliables: Array<string> = []
    Object.keys(ifaces).forEach(function (ifname) {
        ifaces[ifname]?.forEach(function (iface) {
            if (iface.family === "IPv4" && !iface.address.startsWith('127')) addressAvaliables.push(iface.address);
        })
    })
    api.post("/main/static", { path: `http://${addressAvaliables[0]}:${PORT}` })
})