require('dotenv').config()

module.exports = {
        "name": process.env.NODE_ENV,
        "type": "postgres",
        "host": process.env.DATABASE_HOST,
        "port": process.env.DATABASE_PORT,
        "username": process.env.DATABASE_USER,
        "password": process.env.DATABASE_PASSWORD,
        "database": process.env.DATABASE,
        "synchronize": true,
        "logging": true,
        "dropSchema": true,
        "entities": [__dirname + (process.env.NODE_ENV === "development" ? "/src" : "/dist") + "/main/entity/*.*"],
        "subscribers": [__dirname + (process.env.NODE_ENV === "development" ? "/src" : "/dist") + "/main/subscriber/*.*"],
        "cli": {
            "entitiesDir": __dirname  + (process.env.NODE_ENV === "development" ? "/src" : "/dist") + "/src/main/entity",
            "subscribersDir": __dirname  + (process.env.NODE_ENV === "development" ? "/src" : "/dist") + "/src/main/subscriber",
        },
}
