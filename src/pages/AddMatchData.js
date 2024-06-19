import React,{useState,useEffect,useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import MatchService from '../services/MatchService';
import Select from 'react-select';
import PlayerService from '../services/PlayerService';
import * as BsIcons from 'react-icons/bs';
import ReactToPrint from 'react-to-print';
import SchoolService from '../services/SchoolService';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  
import BarLoader from "react-spinners/BarLoader";
const optionsHomeSingles = [];
const optionsAwaySingles = [];
const NOSHOW = 0;
const NOSELECTION = -1;
const scoreOptionsFirst = [ 
{ value: 0, label: 0},
{ value: 2, label: 2},
{ value: 4, label: 4}
]
const scoreOptions = [ 
  { value: 0, label: 0},
  { value: 1, label: 1},
  { value: 2, label: 2}
]


const boardRows=[
    {
        option1:"",
        score1:"",
        option2:"",
        score2:""
    },
    {
        option1:"",
        score1:"",
        option2:"",
        score2:""
    },
    {
        option1:"",
        score1:"",
        option2:"",
        score2:""
    }
];

const AddMatchData=()=> {    
    let componentRef = useRef(); 
    const navigate  = useNavigate();
    const [homeTeamLogo,setHomeTeamLogo]=useState("");
    const [awayTeamLogo,setAwayTeamLogo]=useState("");
    const [error, setError] = useState("")
    const [loading,setLoading] = useState(false);
    const [schoolImages, setSchoolImages] = useState([]);
    const [isSchoolImagesLoaded, setIsSchoolImagesLoaded] = useState(false);

    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }
        if(localStorage.role == "Admin"){
            navigate("/all-players");
        }
        if(localStorage.awayTeam === undefined || localStorage.matchDivision === undefined ||localStorage.matchDate === undefined ){
            navigate("/");
        }
        else{
            fetchData();
        }
        //reset matches
        for(var i = 0; i < boardRows.length; i++) 
        {
            boardRows[i].option1 = "";
            boardRows[i].option2 = "";
            boardRows[i].score1 = "";
            boardRows[i].score2 = "";
        }              
      
        
            // get Schools
            SchoolService.getSchools().then((response) => {                 
                for(var i = 0; i < response.data.length; i++) 
                {
                        schoolImages.push({
                            name: response.data[i].name,
                            image: response.data[i].image,
                        });
                    
                }
                setSchoolImages(schoolImages);
                setIsSchoolImagesLoaded(true);    
            });        
 
    },[]);
    const getImage = (schoolName) => {    
        console.log(schoolImages);
        const foundSchool = schoolImages.find(school => schoolName === school.name);
        if (foundSchool) {
        return foundSchool.image;
        }    
        return null;
    };
   
   

    const fetchData = () => {
        //reset options list
        optionsHomeSingles.length = 0;
        optionsAwaySingles.length = 0;
      
        PlayerService.getPlayersBySchoolAndDivision(localStorage.school,localStorage.matchDivision).then((response) => {           
            for(var i = 0; i < response.data.length; i++) 
            {
                optionsHomeSingles.push({
                    value: response.data[i].playerID,
                    label: response.data[i].playerID+" - "+response.data[i].name
                });
            }
        });
        PlayerService.getPlayersBySchoolAndDivision(localStorage.awayTeam,localStorage.matchDivision).then((response) => {           
            for(var i = 0; i < response.data.length; i++) 
            {
                optionsAwaySingles.push({
                    value: response.data[i].playerID,
                    label: response.data[i].playerID+" - "+response.data[i].name
                });
            }
        });
        optionsHomeSingles.push({
            value: NOSHOW,
            label: 'No Show'
        });
        optionsAwaySingles.push({
            value: NOSHOW,
            label: 'No Show'
        });
    
    }
    
    function isValidMatch(match, maxScore, num){
       /* if (match.player1ID === NOSHOW )
                match.player1Score = 0;
        if (match.player2ID === NOSHOW )
                match.player2Score = 0;*/
        // No show should have value 0
        console.log("Player1 ID:"+match.player1ID + "   Player2 ID:" + match.player2ID )
        if ((match.player1ID === NOSHOW &&  match.player1Score !==0) || (match.player2ID === NOSHOW &&  match.player2Score !==0)){
            setError("Board " + num + ": Set score to 0 for No Show")
            return false;
        }
        // If No Show filled for both players, it is valid match
        else if (match.player1ID === NOSHOW &&  match.player2ID === NOSHOW ){
            return true;
        }
        //check players are filled in 
        else if(match.player1ID === NOSELECTION || match.player2ID === NOSELECTION){
            setError( "Board " + num +": Invalid player details");
            return false;
        }   
        // check scores are filled in         
        else if(match.player1Score ==='' || match.player2Score ===''){
            setError( "Board "+ num + ": Invalid scores");
            return false;
        }
        else if(Math.max(match.player1Score,match.player2Score) !== maxScore){
            setError("Board "+ num +": Max score should be "+maxScore );
            return false;
        }
         // check that both players dont have match score
         else if(match.player1Score === maxScore && match.player2Score ===  maxScore){
            setError("Board" + num+ ": Both Players cant have max score of "+maxScore)
            return false;
        }
        return true;
    }
    /*function checkGhost(playerID)
    {
        if(playerID % 500 === 0){
            return GHOST
        }
        else
            return playerID;
    }*/

    function findPlayerID(selPlayer){
        if(selPlayer === "No Show") {
            return NOSHOW;
        }
        else if(selPlayer === "")
            return NOSELECTION;
        else
            var dashIndex = selPlayer.indexOf("-") 
            return parseInt(selPlayer.substring(0,dashIndex-1));    
    
    }

    const saveMatches = async(e)  => {
        var matches = [];
        matches.length = 0;
        e.preventDefault();
       /* for (var i = 0; i < boardRow1.length; i++){
            var player1ID = findPlayerID(boardRow1[i].option1);
            var player1Score = boardRow1[i].score1;
            var player2ID =  findPlayerID(boardRow1[i].option2); 
            var player2Score = boardRow1[i].score2;
            var division = localStorage.matchDivision;
            var matchDate = localStorage.matchDate;
            var homeTeam = localStorage.school;
            var awayTeam = localStorage.awayTeam;
            var matchdetails = {player1ID,player2ID,player1Score,player2Score,division,matchDate,homeTeam,awayTeam};
            if(isValidMatch(matchdetails,4, i+1)) 
                matches.push(matchdetails);
            else return;
        }*/
        for (var i = 0; i < boardRows.length; i++){
             var player1ID = findPlayerID(boardRows[i].option1);
            var  player1Score = boardRows[i].score1;
             var player2ID =  findPlayerID(boardRows[i].option2); 
             var player2Score = boardRows[i].score2;
             var division = localStorage.matchDivision;
            var  matchDate = localStorage.matchDate;
            var  homeTeam = localStorage.school;
             var awayTeam = localStorage.awayTeam;
             var matchdetails = {player1ID,player2ID,player1Score,player2Score,division,matchDate,homeTeam,awayTeam};
            if(isValidMatch(matchdetails,2, i+1)) 
                matches.push(matchdetails);
            else return;
        }
              
         /* check if player is in more than one match */
         for(  i = 0; i < matches.length; i++){
             player1ID = matches[i].player1ID;
             player2ID = matches[i].player2ID;
           
           for(var j = i+1; j < matches.length; j++){
           
                if(player1ID !== NOSHOW && player1ID === matches[j].player1ID )
                {
                    setError("Player " + player1ID+ " added to more than one match"); 
                    return;
                }
                if(player2ID !== NOSHOW &&player2ID === matches[j].player2ID){
                    setError("Player " + player2ID+ " added to more than one match"); 
                    return;
                }
           }
       }
        if(matches.length===0){
            localStorage.message = "No Matches Added";
            toast.warning(localStorage.message, {
                position: toast.POSITION.TOP_CENTER
            });
            localStorage.message ="";
            return;
        }    
         setLoading(true);
        //await sleep(5000);                                              
        await MatchService.createMatches(matches).then((response) => {
                localStorage.message = "Match results added successfully";
                navigate('/past-matches');    
            }).catch(error1 => { 
            console.log(error1);
            setError("Failed to Create Match");
            setLoading(false);      
        })
        setLoading(false); 
    }   

    return (
        
        <div>
        <header>
            <Navbar /> 
        </header>
        <section>
            <form >
                <ToastContainer/>
                <div>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <h5 className = "userdetail">
                        <span className = "name">
                            Home Team: {localStorage.school} 
                            {isSchoolImagesLoaded  && (
                                    <img src={`data:image/jpeg;base64,${getImage(localStorage.school)}`}  style={{ width: 30, height:30,marginLeft: 5 }} className = 'player1'/>  
                                )}           
                            <br/><br/>
                            Match Date: {localStorage.matchDate}
                        </span>
                        <span className = "school">
                            Away Team: {localStorage.awayTeam}  
                            {isSchoolImagesLoaded  && (
                                    <img src={`data:image/jpeg;base64,${getImage(localStorage.awayTeam)}`}  style={{ width: 30, height:30,marginLeft: 5 }} className = 'player1'/>  
                                )}           
                            <br/><br/> 
                            <div style={{ float: "right"}}>   
                              <ReactToPrint
                                  trigger={()=>{
                                      return <button type="button" className = "btn btn-primary mb-2" disabled = {loading} style={{marginRight: 10}}>  <BsIcons.BsPrinter  style={{ width: 20,height:20,marginRight: 5}}/>  Print</button> 
                                  }}
                                  content = {()=> componentRef}
                                  documentTitle = {localStorage.matchDivision}
                                  pageStyle = "print"
                              />        
                          </div>      
                        </span>
                    </h5>
                </div>
                <h1 className = "text-center">Add {localStorage.matchDivision} Match Results </h1>
                {loading?
                <div style={{marginTop: 0}}>
                    
                    <BarLoader
                        color={"#0d6efd"}
                        loading={loading}        
                        height = {4}
                        width = {200}
                        cssOverride={{marginLeft:'44%'}}          
                    />
                </div>
                :
                <></>    
            }
                
                <table className = "table table-striped" ref={(e1) => (componentRef = e1)}>
                <style type="text/css" media="print">{"\
                                                            @page { size: landscape; }\
                                                            "}</style>
                    <thead className = 'stickyrow'>
                        <tr>
                            <th> Matches </th>
                            <th> {localStorage.school} Player</th>
                            <th> Sets Won</th>
                            <th> {localStorage.awayTeam} Player</th>
                            <th> Sets Won</th>
                        </tr>
                    </thead>
                    <tbody> 
                    
                    {boardRows.map((val,index)=>
                        ( <tr key={index}>
                        <th > Pair {index+1} </th>
                        <th  style={{width: '35%'}}>  
                            <Select
                                type = "text"
                                placeholder = ""
                                name={`player${index}Id`}                                
                                onChange = {(e) =>{ val.option1=e.label; }} 
                                options={optionsHomeSingles}
                            /> 
                        </th>                      
                    
                        <th  style={{width: '10%'}}>  
                                <Select
                                    type = "text"    
                                    placeholder = ""                               
                                    name={`player${index}score`}                                    
                                    onChange = {(e) =>{val.score1 = e.label;}}                                       
                                    options={scoreOptions}
                                    isSearchable={false}                                                  
                                />
                           </th>
                 
                        <th  style={{width: '35%'}}> 
                            <Select
                                type = "text"
                                placeholder = ""
                                name={`player${index+1}Id`}                                 
                                onChange = {(e) =>{ val.option2=e.label; }}  
                                options={optionsAwaySingles}
                            /> 
                        </th>
                        <th  style={{width: '10%'}}>  
                                <Select
                                    type = "text"
                                    placeholder = ""
                                    name={`player${index+1}Score`}                                    
                                    onChange = {(e) =>{ val.score2=e.label; }} 
                                    options={scoreOptions}
                                    isSearchable={false}                                         
                                />
                        </th>
                            
                    </tr>)
                    )}
                 
                        
                    
                    </tbody>
                </table>
           
            </form>
            <button onClick={(e)=>{ saveMatches(e);}} className = "btn btn-primary mb-2 player-right player-left" disabled = {loading}>Submit</button>
            <button onClick={(e)=>{ navigate('/home');}} className = "btn btn-primary mb-2 player-right"  disabled = {loading} >Cancel</button>
            </section>
        </div>
    )
}
    


export default AddMatchData;
