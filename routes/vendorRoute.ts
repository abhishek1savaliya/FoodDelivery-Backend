import { Request, Response, NextFunction } from "express";
import express from 'express';
import { getVendorProfile, updateVendorProfile, updateVendorService ,vendorLogin } from "../controllers";
import { authenticate } from "../middlewares/commonAuth";

const router = express.Router()

router.post('/login', vendorLogin)

router.use(authenticate)

router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorService)


export { router as vendorRoute };