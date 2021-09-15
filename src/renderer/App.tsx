import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
import { ViewContainer } from '../views/ViewContainer';
import { GameView } from '../views/GameView';
import { ScoreView } from 'views/ScoreView';
import './App.global.css';




export default function App() {
  return (
    <div className="helvetica">
      <ViewContainer >
        <Router>
          <Switch>
            <Route exact path="/" component={GameView} />
            <Route path="/Score" component={ScoreView}  />
          </Switch>
        </Router>
      </ViewContainer>
    </div>

  );
}
