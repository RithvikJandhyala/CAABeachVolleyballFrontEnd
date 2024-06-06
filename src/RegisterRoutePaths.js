import React from 'react';
import './App.css';
import App from './App'; 
import {  Route, Routes } from 'react-router-dom';
import Players from './pages/Players';

import AddMatchData from './pages/AddMatchData';
import AddMatchDataform from './pages/AddMatchDataform';
import AddPlayer  from './pages/AddPlayer';
import AllPlayers  from './pages/AllPlayers';
import PlayerMatches from './pages/PlayerMatches';
import MatchesSummary from './pages/MatchesSummary';
import TeamStanding from './pages/TeamStanding';
import Help from './pages/Help';
import AddUser from './pages/AddUser';
import AllUsers from './pages/AllUsers';
import Schools from './pages/Schools';
import AddSchool from './pages/AddSchool';


function RegisterRoutePaths() { 
  return (
    
 
       <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Players />} />
    
        <Route path = "/add-match-data" element ={<AddMatchData />}/>
        <Route path = "/add-match-data-form" element ={<AddMatchDataform />}/>
        <Route path = "/add-player" element ={<AddPlayer />}/>
        <Route path = "/add-user" element ={<AddUser />}/>
        <Route path = "/add-school" element ={<AddSchool />}/>
        <Route path = "/all-players" element ={<AllPlayers />}/> 
        <Route path = "/all-users" element ={<AllUsers />}/>
        <Route path = "/past-matches" element ={<PlayerMatches />}/>
        <Route path = "/matches-summary" element ={<MatchesSummary />}/>
        <Route path = "/team-standing" element ={<TeamStanding />}/>
        <Route path = "/schools" element ={<Schools />}/>
        <Route path = "/help" element ={<Help/>}/>           
      </Routes> 
       
  );
}

export default RegisterRoutePaths;
