import { Request, Response, NextFunction, request } from "express";
import { editVendorInput, vendorLoginInput } from "../dto";
import { findVendor } from "./adminController";
import { genrateSignature, validatePassword } from "../utility";

export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <vendorLoginInput>req.body;

    const existVendor = await findVendor('', email);

    if (existVendor !== null) {
        const validation = await validatePassword(password, existVendor.password, existVendor.password)

        if (validation) {

            const signature = await genrateSignature({
                _id: existVendor._id,
                name: existVendor.name,
                email: existVendor.email,
                foodTypes: existVendor.foodType
            })

            return res.json(signature)
        }
        else {
            return res.json({ message: "Password not valid" })
        }
    }

    return res.json({ message: "Login credential not valid" })
}

export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (user) {
        const existVendor = await findVendor(user._id)
        return res.json(existVendor)
    }

    return res.json({ message: "vendor not found" })
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { foodType, phone, name, address } = <editVendorInput>req.body
    const user = req.user;

    if (user) {
        const existVendor = await findVendor(user._id)

        if (existVendor !== null) {
            existVendor.name = name
            existVendor.address = address
            existVendor.phone = phone
            existVendor.foodType = foodType

            const savedResult = await existVendor?.save()

            return res.json(savedResult)
        }

        return res.json(existVendor)
    }

    return res.json({ message: "vendor not found" })
}


export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    
    if (user) {
        const existVendor = await findVendor(user._id)

        if (existVendor !== null) {

            existVendor.serviceAvailable = !existVendor.serviceAvailable;

            const savedResult = await existVendor?.save()

            return res.json(savedResult)
        }

        return res.json(existVendor)
    }

    return res.json({ message: "vendor not found" })
}
