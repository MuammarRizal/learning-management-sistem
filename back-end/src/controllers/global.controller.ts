import { Request, Response } from "express"

const HelloWorld = (req: Request,res: Response) => {
    res.send({message: "Halo Buku bersama"})
}

export default HelloWorld