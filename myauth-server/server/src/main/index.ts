import 'reflect-metadata';
import 'dotenv/config';
import express from "express";
import cors from 'cors';
import {ApolloServer} from "apollo-server-express";
import {createSchema} from "./utils/schema";
import {typeOrmConnection} from "./utils/typeOrmConnection";
import {seedDatabase} from "./utils/seedDB";


const main = async () => {
    const app = express();

    app.use(cors());

    app.get('/', (_, res) => res.send('Welcome!! Still alive...'));

    // initiation DB connection/creation
    await typeOrmConnection();

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
        context: ({ req, res }) => {
            const ctx: any = {
                req,
                res,
            };
            return ctx;
        },
        schema,
        introspection: true,
        playground: {
            settings: {
                'request.credentials': 'include',
            },
        },
    });

    app.use('/graphql', express.json());

    apolloServer.applyMiddleware({ app, cors: false });

    app.listen(process.env.GRAPHQL_PORT, async () => {
        await seedDatabase();
        console.log(`server started on port ${process.env.GRAPHQL_PORT}`);
    });
}

main().catch((err) => console.error(err));
