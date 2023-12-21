import express from 'express';
import { addFood, getFood, getVendorProfile, updateVendorCoverImage, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers";
import { authenticate } from "../middlewares/commonAuth";
import multer from "multer";
import moment from 'moment';

const router = express.Router()

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dest = 'images';
        cb(null, dest);
    },
    filename: (req, file, cb) => {
        cb(null, moment().format('DD-MM-YYYY').toString() + '-' + file.originalname);
    },
});

const images = multer({ storage: imageStorage }).array('images');

router.post('/login', vendorLogin)

router.use(authenticate)

router.get('/profile', getVendorProfile)
router.patch('/profile', updateVendorProfile)
router.patch('/coverimage',images,updateVendorCoverImage)
router.patch('/service', updateVendorService)

router.post('/food', images, addFood)
router.get('/foods', getFood)


export { router as vendorRoute };