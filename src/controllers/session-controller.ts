import { Request, Response } from "express"
 
class SessionController {
    create(request: Request, response: Response){


        return response.json({message: "ok"})
    }
}

export {SessionController}