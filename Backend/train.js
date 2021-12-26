// Let import required modules
const { NlpManager } = require('node-nlp')
const fs = require('fs')

// Creating instance of nlpmanager
const manager = new NlpManager({ languages: ['en'] })

// Reading whole directory
const files = fs.readdirSync('./intents')

// Loop through each file in intent directory and store in manager
for (const file of files) {
  let data = fs.readFileSync(`./intents/${file}`)
  data = JSON.parse(data)
  const intent = file.replace('.json', '')
  for (const pattern of data.patterns) {
    console.log(pattern)
    manager.addDocument('en', pattern, intent)
  }
  for (const response of data.responses) {
    manager.addAnswer('en', intent, response)
  }
}

// Training manager
async function train_save() {
  await manager.train()
  manager.save()
}

train_save()
