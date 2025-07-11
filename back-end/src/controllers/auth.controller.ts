import bcrypt from 'bcrypt'
import userModel from '../models/user.model'
import { Request, Response } from 'express'
import { AuthRequest } from '../types/authRequest.type'

export const signUpAction = async (req: Request, res: Response) => {
    try {
        const body: AuthRequest = req.body

        const hashPassword = bcrypt.hashSync(body.password, 12)
    
        const user = new userModel({
            name: body.name,
            email: body.email,
            password: hashPassword,
            photo: 'https://google.com',
            role: 'manager'
        })
    
        // action payment gateway midtrans
    
        await user.save()
    
        return res.json({
            message: "Sign Up Success",
            data: {
                midtrans_payment_url: "https://google.com"
            }
        })   
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}