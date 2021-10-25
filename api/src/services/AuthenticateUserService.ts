/**
 * Receber codigo -> string
 * Recuperar o access_token do github
 * Recuperar o usuario do github
 * Verificar se o usuario existe no banco
 * Se sim, gera um token pra ele
 * Se não, criamos um no bd, e gera um token pra ele
 * Retorna o token com as infos do usuario
 */
import axios from "axios"

interface IAccessTokenResponse {
	access_token: string
}

interface IUserResponse {
	avatar_url: string
	login: string
	id: number
	name: string
}

class AuthenticateUserService {
	async execute(code: string) {
		const url = "https://github.com/login/oauth/access_token"

		const { data: accesTokenResponse } = await axios.post<IAccessTokenResponse>(url, null, {
			params: {
				client_id: process.env.GITHUB_CLIENT_ID,
				client_secret: process.env.GITHUB_CLIENT_SECRET,
				code
			},
			headers: {
				Accept: "application/json"
			}
		})

		const response = await axios.get<IUserResponse>("https://api.github.com/user", {
			headers: {
				authorization: `Bearer ${accesTokenResponse.access_token}`
			}
		})

		return response.data
	}
}

export { AuthenticateUserService }
