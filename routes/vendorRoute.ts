import express from 'express';
import { addFood, getFood, getVendorProfile, updateVendorProfile, updateVendorService ,vendorLogin } from "../controllers";
import { authenticate } from "../middlewares/commonAuth";

const router = express.Router()

router.post('/login', vendorLogin)

router.use(authenticate)

router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/service', updateVendorService)

router.post('/food',addFood)
router.get('/foods',getFood)


export { router as vendorRoute };