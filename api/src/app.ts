import "dotenv/config"
import express from "express"
import { router } from "./routes"

import Http from 'http'
import { Server } from "socket.io"

const app = express()

const serverHttp = Http.createServer(app)

const io = new Server(serverHttp)

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

app.listen(4000, () => {
	console.log("listening on port 3000")
})
