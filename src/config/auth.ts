import { env } from "../env"

export const authCOnfig = {
    jwt: {
        secret: env.JWT_SECRET,
        expiresIn: "1d"
    }
}