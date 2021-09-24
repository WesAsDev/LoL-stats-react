const express = require('express')
const { json } = require('express')
const cors = require('cors')
const axios = require('axios')
const timeout = require('connect-timeout') //express v4
require('dotenv').config()

const app = express()

app.use(cors())
app.use(json())
app.listen(3333)
app.use(timeout(120000))
app.use(haltOnTimedout)

function haltOnTimedout(req, res, next) {
  if (!req.timedout) next()
}

app.get('/', async (req, res) => {
  res.send('hello')
})

app.get('/summoner/:sumName', async (req, res) => {
  const summonerName = req.params.sumName
  console.log(summonerName)
  const summonerIdResponse = await axios
    .get(
      `${process.env.LOL_URL}/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          'X-Riot-Token': process.env.LOL_KEY
        }
      }
    )
    .catch(e => {
      return res.status(e.response.status).json(e.response.data)
    })

  const { id, profileIconId, summonerLevel } = summonerIdResponse.data
  console.log(id)

  const responseRanked = await axios
    .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`, {
      headers: {
        'X-Riot-Token': process.env.LOL_KEY
      }
    })
    .catch(e => {
      return res.status(e.response.status).json(e.response.data)
    })

  const { tier, rank, wins, losses, queueType } = responseRanked.data[0]

  return res.json({
    summonerName,
    summonerLevel,
    profileIconId,
    tier,
    rank,
    wins,
    losses,
    queueType,
    winRate: ((wins / (wins + losses)) * 100).toFixed(1)
  })
})
