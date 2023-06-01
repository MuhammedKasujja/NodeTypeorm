import "reflect-metadata"
import express from 'express'
import usersRouter from "./routes/users"

const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.json())

app.use("/users", usersRouter);

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
}); 