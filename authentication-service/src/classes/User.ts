export enum Status {
    inactive,
    active
}

export default class User {
    uuid?: string;
    id?: number;
    email?: string;
    password?: string;
    name?: string;
    status?: Status;
    created_at: Date;
    updated_at: Date;

    constructor() {
        this.created_at = new Date(Date.now())
        this.updated_at = new Date(Date.now())
    }

    newUser(name: string, email: string, password: string, status: Status) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.status = status

        return this;
    }
}