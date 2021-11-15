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
          'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
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
        'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
      }
    })
    .catch(e => {
      return res.status(e.response.status).json(e.response.data)
    })

  const { tier, rank, wins, losses, queueType } = responseRanked.data[0]

  const responseHistory = await axios.get(
    `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
    {
      headers: {
        'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
      }
    }
  )
  .then(response => {
    return response.data
  })
  .catch(e => {
    console.log(e)
  })

  console.log(responseHistory)

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
    responseHistory,
    winRate: ((wins / (wins + losses)) * 100).toFixed(1)
  })
})

app.get('/summoner/history/:puuid', async (req,res) =>{
  const puuid = req.params.puuid
  console.log(puuid)
  const partidas = await axios.get(
    `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`,
    {
      headers: {
        'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
      }
    }
  )
  .then(response => {
    return response.data
  })
  .catch(e => {
    console.log(e)
  })

  console.log("VV")
  console.log(partidas[0])


  let partida1 = `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/${partidas[0]}`
  let partida2 = `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/${partidas[1]}`
  let partida3 = `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/${partidas[2]}`
  let partida4 = `${process.env.LOL_MATCH_URL}/lol/match/v5/matches/${partidas[3]}`


  const request1 = await axios.get(partida1,{headers:{
    'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
  }})
  const request2 = await axios.get(partida2,{headers:{
    'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
  }})
  const request3 = await axios.get(partida3,{headers:{
    'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
  }})
  const request4 = await axios.get(partida4,{headers:{
    'X-Riot-Token': 'RGAPI-c8356d07-42b4-41f1-b44a-121d023221ae'
  }})

const allPartidas = await axios.all([request1,request2,request3,request4]).then(axios.spread((p1,p2,p3,p4)=>{
  const res1 = p1.data
  const res2 = p2.data
  const res3 = p3.data
  const res4 = p4.data

  const allPartidas = [res1.info,res2.info,res3.info,res4.info]

  return allPartidas
}))

return res.json({allPartidas})
})
