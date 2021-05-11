import 'dotenv/config';
import {createConnection, getConnectionOptions} from "typeorm";

export const typeOrmConnection = async () => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    return createConnection({
        ...connectionOptions,
        ssl: process.env.NODE_ENV === 'production',
        name: 'default'
    });
};
