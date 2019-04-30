import { FastifyInstance } from "fastify";
import { Connection } from "typeorm";
import * as fastifyStatic from 'fastify-static';
import { join } from "path";
import { readFileSync } from "fs";

export default function OrmPanelPlugin(fastify: FastifyInstance, opts, next) {
    const connection = opts.connection as Connection;
    fastify.register(fastifyStatic, { root: join(__dirname, 'public'), prefix: '/public' })
    fastify.get('/', async (req, reply) => {
        let html=readFileSync(join(__dirname, 'public', 'index.html'), { encoding: 'utf-8' });
          reply.type('text/html')
            .send(html);
    });
    fastify.get('/api/db', async () => {
        return connection.entityMetadatas.map(m => ({
            name: m.name,
            columns: m.columns.map(c => c.propertyName)
        }));


    })
    next();
}