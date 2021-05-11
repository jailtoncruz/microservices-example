import path from 'path';
import fs from 'fs';
import { existsSync, mkdirSync } from 'fs';
import { Request, Response } from 'express';

export enum Controllers {
    MainService = "MainService",
    AuthenticationService = "AuthenticationService",
    LoggerService = "LoggerService",
    StaticFileService = "StaticFileService",
}
const WORKDIR = path.join(process.cwd(), "logs");
const logs: Array<string> = [];

class LoggerController {
    constructor() {
        if (!existsSync(WORKDIR)) mkdirSync(WORKDIR)
    }

    index(req: Request, res: Response) {
        if (logs.length === 0) {
            const today = new Date(Date.now());
            const fileName = `totem-logs-${today.getDate().toString().padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}.log`;
            const file = fs.readFileSync(path.join(WORKDIR, fileName)).toString();
            const loadLogs = file.split("\n");
            loadLogs.pop(); // Elimina linha vazia no final
            logs.push(...loadLogs);
        }
        return res.json(logs);
    }

    write(req: Request, res: Response) {
        const { source, message } = req.body
        const today = new Date(Date.now());
        const fileName = `totem-logs-${today.getDate().toString().padStart(2, "0")}-${String(today.getMonth() + 1).padStart(2, "0")}-${today.getFullYear()}.log`;
        const fullLogMessage = `[${today.getDate().toString().padStart(2, "0")
            }-${String(today.getMonth() + 1).padStart(2, "0")
            }-${today.getFullYear()} ${today.getHours().toString().padStart(2, "0")
            }:${today.getMinutes().toString().padStart(2, "0")
            }:${today.getMilliseconds().toString().padEnd(2, "0").slice(0, 2)}]:  ${source} >  ${message}`;

        fs.appendFile(path.resolve(WORKDIR, fileName), fullLogMessage + "\n", (err) => {
            if (err) throw err;
            console.log(fullLogMessage);
        })
        logs.push(fullLogMessage)
        return res.json();
    }

}

export default LoggerController;