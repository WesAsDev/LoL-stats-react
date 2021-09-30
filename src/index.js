const express = require('express')
const { json } = require('express')
const cors = require('cors')
const axios = require('axios')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(json())
app.listen(3333)

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
          'X-Riot-Token': 'RGAPI-e5a4dd23-d590-4075-9cc5-9b18bd47f69a'
        }
      }
    )
    .catch(e => {
      return res.status(e.response.status).json(e.response.data)
    })

  const { puuid, id, profileIconId, summonerLevel } = summonerIdResponse.data

  console.log(puuid)

  const responseRanked = await axios
    .get(`${process.env.LOL_URL}/lol/league/v4/entries/by-summoner/${id}`, {
      headers: {
        'X-Riot-Token': 'RGAPI-e5a4dd23-d590-4075-9cc5-9b18bd47f69a'
      }
    })
    .catch(e => {
      return res.status(e.response.status).json(e.response.data)
    })

  const { tier, rank, wins, losses, queueType } = responseRanked.data[0]

  return res.json({
    summonerName,
    puuid,
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

app.get('/summoner/:sumName/:puuid', async (req, res) => {
  const puuid = req.params.puuid
  console.log(puuid)
  const matchIdsresponse = await axios
    .get(
      `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
      {
        headers: {
          'X-Riot-Token': 'RGAPI-e5a4dd23-d590-4075-9cc5-9b18bd47f69a'
        }
      }
    )
    .then(response => {
      return response.data
    })
    .catch(e => {
      console.log(e)
    })

console.log(matchIdsresponse)

matchIdsresponse.map((id) =>{
  return ( async() =>{
     await axios.get(
    `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/${id}`,
    {
      headers: {
        'X-Riot-Token': 'RGAPI-e5a4dd23-d590-4075-9cc5-9b18bd47f69a'
      }
    }
  )
  .then(response => {
    console.log(response.data)
    return response.data
  })
  .catch(e => {
    console.log(e)
    
  })


  })
})







})
