import axios from 'axios'
const SERVER_URL = 'https://azcaabeachvolleyballbackend-ab02410049f8.herokuapp.com';
const PLAYERS_REST_API_URL = SERVER_URL + '/findAllPlayers';
const PLAYERS_BY_SCHOOL_REST_API_URL = SERVER_URL + '/findPlayersBySchool';
const PLAYERS_BY_DIVISION_REST_API_URL = SERVER_URL + '/findPlayersByDivision';
const PLAYERS_BY_SCHOOL_DIVISION_REST_API_URL = SERVER_URL + '/findPlayersBySchoolAndDivision';
const PLAYER_CREATE_REST_API_URL = SERVER_URL + '/addPlayer';
const PLAYER_DELETE = SERVER_URL + '/deletePlayer'


class PlayerService {
    getPlayers(){
       return  axios.get(PLAYERS_REST_API_URL);
    }
   getPlayersBySchool(school){
        var url = PLAYERS_BY_SCHOOL_REST_API_URL+"/"+school;
        //check if there is space at the end
        function hasSpaceAtEnd(str) {
            return str[str.length - 1] === ' ';
        }        
        if(hasSpaceAtEnd(url)){
            url = url.trim()+"%20";
        }
        return axios.get(url);
    }
    getPlayersByDivision(division){
        var url = PLAYERS_BY_DIVISION_REST_API_URL+"/"+division;
        return axios.get(url)
       
    }        
    getPlayersBySchoolAndDivision(school,division){
        var url = PLAYERS_BY_SCHOOL_DIVISION_REST_API_URL+"/"+school+"/"+division;
        return axios.get(url)
       
    }    
    createPlayer(player){
        return axios.post(PLAYER_CREATE_REST_API_URL,player)
    }
    deletePlayer(id){
        return axios.get(PLAYER_DELETE+"/"+id)
    }

}

export default new PlayerService()
