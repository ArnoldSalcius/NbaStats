import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer';
import PlayerSearch from './players/PlayerSearch';
import PlayerSaved from './players/PlayerSaved';
import Home from './Home/Home';
import './App.css';

const App = () => {
    return (
        <div className='app'>
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
                <Footer />
            </Router>
        </div >
    )
}

export default App;
