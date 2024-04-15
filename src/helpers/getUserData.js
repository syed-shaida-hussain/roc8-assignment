import jwt  from "jsonwebtoken"

export const getUserDataFromToken = async (request) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(encodedToken , process.env.SECRET_KEY);
        return decodedToken?.id
     } catch (error) {
        throw new Error(error.message)
    }
}