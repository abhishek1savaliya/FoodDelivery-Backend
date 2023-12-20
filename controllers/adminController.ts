import { Request, Response, NextFunction, request } from "express";
import { createVendorInput } from "../dto";
import { Vendor } from "../models";
import { generatePassword, generateSalt } from "../utility";

export const createVendor = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, pincode, foodType, email, password, ownerName, phone } = <createVendorInput>req.body;

    const existVendor = await Vendor.findOne({
        email: email
    })

    if (existVendor) {
        return res.json({ message: "vendor is exist" })
    }

    const salt = await generateSalt()
    const userPassword = await generatePassword(password,salt)



    const createVendor = await Vendor.create({
        name: name,
        ownerName: ownerName,
        foodType: foodType,
        pincode: pincode,
        address: address,
        phone: phone,
        email: email,
        password: userPassword,
        salt: salt,
        serviceAvailable: false,
        coverImages: [],
        rating: 0,
        // foods: any
    })

    return res.json(createVendor)
}

export const getVendors = async (req: Request, res: Response, next: NextFunction) => {

}


export const getVendorById = async (req: Request, res: Response, next: NextFunction) => {

}

