import axios from 'axios'
const SERVER_URL = 'https://azcaabeachvolleyballbackend-ab02410049f8.herokuapp.com';
const MATCHES_REST_API_URL = SERVER_URL + '/findAllMatches';
const MATCHES_DAY_SUMMARY_REST_API_URL = SERVER_URL + '/findAllMatchDaySummary';
const TEAM_STANDING_REST_API_URL = SERVER_URL + '/findTeamStanding';
const MATCHES_CREATE_REST_API_URL = SERVER_URL + '/addMatches';
const MATCH_SUMMARY_DELETE = SERVER_URL + '/deleteMatchSummary';
const RESET_SEASON =  SERVER_URL + '/resetSeason';


class MatchService {
    getMatches(){
       return  axios.get(MATCHES_REST_API_URL);
    }
    getMatchesByDivision(division){
        return  axios.get(MATCHES_REST_API_URL+"/"+division);
    }
    createMatches(matches){
        return axios.post(MATCHES_CREATE_REST_API_URL,matches)
    }
    getMatchesDaySummary(){
        return  axios.get(MATCHES_DAY_SUMMARY_REST_API_URL);
    }
    getMatchesDaySummaryByDivision(division){
        return  axios.get(MATCHES_DAY_SUMMARY_REST_API_URL+"/"+division);
    }
    getTeamStanding(){
        return  axios.get(TEAM_STANDING_REST_API_URL);
    }
    getTeamStandingByDivisionAndSchool(division,school){
        return  axios.get(TEAM_STANDING_REST_API_URL+"/"+division+"/"+school);
    }
    getTeamStandingByDivision(division){
        if(division ==='All'){
            return  axios.get(TEAM_STANDING_REST_API_URL)
        }
        else{
            return  axios.get(TEAM_STANDING_REST_API_URL+"/"+division);
        }
    }
    deleteMatchSummary(matchSummaryID){
        return  axios.get(MATCH_SUMMARY_DELETE+"/"+matchSummaryID);
    }
    resetSeason(){
        return axios.get(RESET_SEASON);
    }

}

export default new MatchService()
