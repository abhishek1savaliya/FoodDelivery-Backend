import express, { Request, Response, NextFunction } from 'express';

const router = express.Router()

router.get('/:pincode')


router.get('/top-restaurants/:pincode')

router.get('/foods-in-30-min/:pincode')

router.get('/search/:pincode')

router.get('/restuarent/:id')

export { router as ShoppingRoute };

