import "dotenv/config"
import Http from "http"
import cors from "cors"
import express from "express"
import { router } from "./routes"

import { Server } from "socket.io"

const app = express()
app.use(cors())

const serverHttp = Http.createServer(app)

const io = new Server(serverHttp, {
	cors: {
		origin: "*",
	},
})

io.on("connection", socket => {
	console.log("Nova conexão no socket " + socket.id)

	socket.on("disconnect", () => {
		console.log("Conexão finalizada com o socket " + socket.id)
	})
})

app.use(express.json())
app.use(router)

app.get("/github", (req, res) => {
	res.redirect(
		`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
	)
})

app.get("/signin/callback", (req, res) => {
	const { code } = req.query

	return res.json(code)
})

export { serverHttp, io }