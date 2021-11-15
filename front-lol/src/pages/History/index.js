import api from '../../services/api'
import { useEffect, useState } from 'react'
import '../Summoner/styleSum.css'
import { addListener } from 'nodemon'

export default function History({ match }) {
  const [infos, setInfos] = useState(['load','load','load'])
  const [partidas, setPartidas] = useState (['partidas'])
  const [loading, setLoading] = useState(1)
  const [winlose, setWinlose] = useState('')
  const [times, setTimes] = useState([])


useEffect(async () => {
    await api
    .get(`/summoner/${match.params.id}`)
    .then(res => {
      setInfos(res.data)

    }).then(() => {
      console.log('a') 
    })
    .catch(e => console.log('error'))
  setLoading(0)
}
, [])

useEffect(async ()=>{
  if(loading == 0){
        console.log('history')
        await api.get(`/summoner/history/${infos.puuid}`).then(res =>{
          setPartidas(res.data.allPartidas)
        })
      }
  
    
},[loading])

console.log(partidas)
  return (
    <>
      <main>
        {loading ? (
          <h1>carregando</h1>
        ):(
          <>
            <div className="partida">
            <ul>
            
            </ul>

            <ul className="list-partidas-2">
            
            </ul>
            </div>
            
          </>
        )}
      </main>
    </>
  )

}


