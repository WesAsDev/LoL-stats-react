import { useState } from 'react'
import './style.css'
import Background from '../../assets/background-3.png'
import Logo from '../../assets/lollogo.png'
import ahri from '../../assets/image-4.png'

/* code */
export default function Home({ history }) {
  const [summoner, setSummoner] = useState('')

  return (
    <main>
      <div className="box">
        <div className="inputBox">
          <img src={Logo} />

          <div className="search">
            <input
              placeholder="summoner"
              value={summoner}
              onChange={e => setSummoner(e.target.value)}
            ></input>
            <button onClick={() => history.push(`/summoner/${summoner}`)}>
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="background-color">
        <img className="ahri" src={ahri}></img>
        <img className="bg" src={Background}></img>
      </div>
    </main>
  )
}
