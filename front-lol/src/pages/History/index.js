import api from '../../services/api'
import { useEffect, useState } from 'react'
import '../Summoner/styleSum.css'

export default function History({ match }) {
  const [infos, setInfos] = useState(['load','load','load'])
  const [loading, setLoading] = useState(1)
  const [winlose, setWinlose] = useState('')
  const [times, setTimes] = useState([])


  useEffect(async () => {
   await fetch(
      `http://localhost:3333/summoner/${match.params.id}/${match.params.puuid}`
    ).then((response) => response.json().then((response) => {setInfos(response); setLoading(0)}))

    

    
  }, [])
  
  console.log(infos)
  let summonerName = '0'
 
  useEffect(() =>{
    if(loading == 0){

  
      infos.participants.forEach((summon) => {
        
        if(summon.summonerName.toLowerCase() == match.params.id.toLowerCase()){
          console.log(summon.win)

          if(summon.win){
            setWinlose('ganhou')
          }
         else{
           setWinlose('perdeu')
         }
        }


    
  
      });
   
    
  
  }
  },[loading])
 
  console.log(times)

  

  return (
    <>
      <main>
        {loading ? (
          <h1>carregando</h1>
        ) : (
          <>
          <div className="partida">
            <ul className="list-partidas-1">
            {infos.participants.map((summon) => {
              console.log(summon.teamId)
              if(summon.teamId == 100){
              return(
             
                 <li className="list-1" key={Math.random()}>{`${summon.summonerName}`}<img className="championImg" src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${summon.championName}.png`}/></li>

               ) }
})}
 </ul>

 <ul className="list-partidas-2">
   {infos.participants.map((summon) =>{
     
     if(summon.teamId ==200){
      return <li className="list-2" key={Math.random()}>{`${summon.summonerName}`}<img className="championImg" src={`http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/${summon.championName}.png`}/></li>
      }
   })}
 </ul>
          </div>
          <h1>{winlose}</h1>
          <div className={winlose}></div>
          </>
        )}
      </main>
    </>
  )
}
