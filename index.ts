import express from "express";
import bodyParser from "body-parser";
import { adminRoute, vendorRoute } from './routes'
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', adminRoute)
app.use('/vendor', vendorRoute)

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(result => {
    console.log("DB Connected")
}).catch(error => {
    console.log('error', error)
})

app.listen(8000, () => {
    console.log('App is listening to the port 8000')
})