import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Summoner from '../pages/Summoner'
import History from '../pages/History'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/summoner/:id" exact component={Summoner} />
        <Route path="/summoner/:id/history" exact component={History} />
      </Switch>
    </BrowserRouter>
  )
}
