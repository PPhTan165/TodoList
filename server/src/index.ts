// This is a simple Express server that responds to a ping request
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong!' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
