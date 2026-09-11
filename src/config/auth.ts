export const authCOnfig = {
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: "1d"
    }
}