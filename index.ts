import express from 'express'
import expressApp from './services/expressApp';
import database from './services/database';

const startServer = async () => {

    const app = express()

    await database()

    await expressApp(app);

    app.listen(8000, () => {
        console.log('Listening on port 8000')
    })
}

startServer()