import * as fastify from "fastify";
import {createConnection} from 'typeorm';
import OrmPanelPlugin from "./server";
async function start() {
    const app = fastify();
    const connection=await createConnection();

    app.register(OrmPanelPlugin, { prefix: '/',connection });
    await app.listen(3000);
    console.log('server started');
}

start();
