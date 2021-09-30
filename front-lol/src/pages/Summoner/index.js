import { useEffect, useState } from 'react'
import api from '../../services/api'
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styleSum.css'
import vector2 from '../../assets/Vector-2.png'
import vector3 from '../../assets/Vector-3.png'
import evelynn from '../../assets/image-5.png'

export default function Summoner({ match, history }) {
  const [summoner, setSummoner] = useState(Object)
  const [loading, setLoading] = useState(1)
  const [active, setActive] = useState('of')
  const [tiers, setTier] = useState('')

  useEffect(() => {
    async function loadData() {
      await api
        .get(`/summoner/${match.params.id}`)
        .then(res => {
          setSummoner(res.data)
          console.log(res.data)
          setActive('active')
        })
        .catch(e => console.log('error'))
      setLoading(0)
    }

    loadData()
  }, [])

  let rank = summoner.tier
  let tier
  console.log('carregado')
  switch (rank) {
    case 'BRONZE':
      tier = rank
      console.log(tier)
      break
    case 'SILVER':
      tier = rank
      console.log(tier)
      break
    case 'GOLD':
      tier = rank
      console.log(tier)
    default:
      tier = 'Rank inválido'
  }

  return (
    <>
      <div className="background-color">
        <main>
          {loading ? (
            <div className="loading">
              <Spinner animation="border" variant="primary" />
              <div className={`rankInfo ${active}`}>
                <div className="rank">
                  <img
                    src={`https://opgg-static.akamaized.net/images/medals/${tier.toLowerCase()}_1.png`}
                  />
                </div>
                <h2>
                  {' '}
                  {summoner.tier} {summoner.rank}
                </h2>
              </div>
            </div>
          ) : (
            <div className="flex-container">
              <div className={`summonerInfo ${active}`}>
                <div className="picture">
                  <img
                    className="image"
                    src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/profileicon/${summoner.profileIconId}.png`}
                  />
                </div>
                <h1 className={`name ${active}`}>{summoner.summonerName}</h1>
              </div>
              <div className={`rankInfo ${active}`}>
                <div className="rank">
                  <img
                    src={`https://opgg-static.akamaized.net/images/medals/${tier.toLowerCase()}_1.png`}
                  />
                </div>
                <h2>
                  {' '}
                  {summoner.tier} {summoner.rank}
                </h2>
              </div>
              <h2
                onClick={() =>
                  history.push(`${summoner.summonerName}/${summoner.puuid}`)
                }
              >
                History
              </h2>
              <div className="backgroundSum">
                <img className="vector1" src={vector2}></img>
                <img className="vector3" src={vector3}></img>
                <img className="evelynn" src={evelynn}></img>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
