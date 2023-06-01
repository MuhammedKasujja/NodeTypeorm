import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging: true,
    entities: ['./src/entity/index.ts'],
    subscribers: [],
    migrations: [],
})

AppDataSource.initialize()
    .then(() => {
        // here you can start to work with your database
    })
    .catch((error) => console.log('DatabaseConnectionError', error))