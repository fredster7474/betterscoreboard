const express = require('express')
const sequelize = require('./database')
const Sequelize = require('sequelize')
const app = express()
const port = process.env.PORT || 3030
const bodyParser = require('body-parser')

app.use(bodyParser.json())


var Player = sequelize.define('player', {
  name: Sequelize.STRING,
  score: Sequelize.INTEGER
}, {
  tableName: 'Players'
})

app.get('/', (req, res) => {
  res.json({ message: 'Yo!' })
})

app.get('/players', (request, response) => {
  Player.findAll().then(players => {
    response.send({ players })
  })
})

app.put('/players/:id', (req, res) => {
  const playerId = Number(req.params.id)
  const scoreUpdate = req.body

  Player.findById(playerId)
    .then(player => {
      return player.update(scoreUpdate)
    })
    .then(updatedPlayer => {
      res.json(updatedPlayer)
    })
    .catch(err => {
      res.status(500).send({
        message: 'Something went wrong',
        err
      })
    })
})

app.listen(port, () => {
  console.log(`
Server is listening on ${port}.

Open http://localhost:${port}

to see the app in your browser.
    `)
})
