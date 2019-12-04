const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.post('/subscribe', (req, res) => {
	const { email, js } = req.body
	console.log('req.body')

	const mcData = {
		members: [
			{
				email_address: email,
				status: 'pending'
			}
		]
	}

	const mcDataPost = JSON.stringify(mcData)

	const options = {
		url: '', //incomplete
		method: 'POST',
		headers: {
			Authorization: '' //incomplete
		},
		body: mcDataPost
	}

	if (email) {
		request(options, (err, response, body) => {
			if (err) {
				res.json({ error: err })
			} else {
				if (js) {
					res.sendStatus(200)
				} else {
					res.redirect('/success.html')
				}
			}
		})
	} else {
		res.status(404).send({ message: 'Failed' })
	}
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log('server started!'))
