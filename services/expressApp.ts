import express,{ Application } from "express";
import bodyParser from "body-parser";
import path from 'path'
import { adminRoute, vendorRoute } from "../routes";
import { ShoppingRoute } from "../routes/shoppingRoute";

export default async (app: Application) => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    app.use('/images', express.static(path.join(__dirname, 'images')));

    app.use('/admin', adminRoute)
    app.use('/vendor', vendorRoute)
    app.use('/shopping',ShoppingRoute)

    return app;
}

