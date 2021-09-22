import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './Header/Header';
import PlayerSearch from './players/PlayerSearch';
import PlayerSaved from './players/PlayerSaved';
import Home from './Home/Home';

const App = () => {
    return (
        <div >
            <Router>
                <Header />
                <div className='container'>
                    <Switch>
                        <Route path='/' exact>
                            <Home />
                        </Route>
                        <Route path='/search' component={PlayerSearch} />
                        <Route path='/players' component={PlayerSaved} />
                    </Switch>
                </div>

            </Router>
        </div >
    )
}

export default App;
