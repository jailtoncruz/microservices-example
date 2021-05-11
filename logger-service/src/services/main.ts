import axios from 'axios';

const main = axios.create({ baseURL: "http://172.20.0.2:3333" });

export default main;