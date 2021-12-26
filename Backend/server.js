// Import required library
const { NlpManager } = require('node-nlp')
const express = require('express')
require('colors')

// Instance of NlpManager
const manager = new NlpManager({ languages: ['en'] })
const router = express.Router()
const app = express()

app.use(express.json())

// Load pretrained model
manager.load()

router.post('/chat', async function (req, res) {
  const message = req.body.message
  console.log(message)
  const response = await manager.process('en', message)
  console.log(response.answer)
  if (!response.answer) {
    res.json({ msg: 'I am unable to answer your query.' })
  }
  res.json({ msg: response.answer })
})

app.use(router)
app.get('/', (req, res) => {
  res.send('API is running')
})

const PORT = 5000

app.listen(PORT, console.log(`Server running on port ${PORT}`.yellow.bold))
