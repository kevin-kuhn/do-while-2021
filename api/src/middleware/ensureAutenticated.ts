import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"

interface IPayload {
	sub: string
}
//se usuario não estiver autenticado, aplicação retorna erro
//se tiver autenticado, passa para frente
export const ensureAuthenticated = (
	request: Request,
	response: Response,
	next: NextFunction
) => {
	const authToken = request.headers.authorization

	if (!authToken) {
		return response.status(401).json({ message: "Token inválido" })
	}

	const [, token] = authToken.split(" ")

	try {
		const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

		request.user_id = sub

		return next()
	} catch (error) {
		return response.status(401).json({ message: "Token expirado" })
	}
}
