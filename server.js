const axios = require('axios')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 5022
app.use(bodyParser.json())

app.post('/api/proxy', async (req, res) => {
	const url = req.body.url
	try {
		const cgRes = await axios.get(url)
		res.send({
			error: false,
			response: cgRes.data,
		})
	} catch (error) {
		res.send({
			error: true,
			error_name: error.name,
			error_message: error.message
		})
	}
})

app.get('/api/ip', async (_, res) => {
	try {
		const response = await axios.get('https://icanhazip.com/')
		const ip = response.data.replace('\n', '')
		res.send({
			error: false,
			ip
		})
	} catch (error) {
		res.send({
			error: true,
			error_name: error.name,
			error_message: error.message
		})
	}
})

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})
