import React, {useState,useRef,useEffect} from 'react'
import PlayerService from '../services/PlayerService'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import BarLoader from "react-spinners/BarLoader";

const AddPlayer = () => {
    const [player1Name,setPlayer1Name] = useState('')
  const [player2Name,setPlayer2Name] = useState('')
  const [school,setSchool] = useState(localStorage.school)
  const [division,setDivision] = useState('')
  const navigate  = useNavigate();
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }    
    });

    const inputPlayer1Name = useRef();
    const inputPlayer2Name = useRef();
  const inputDivision = useRef();
  
  const [loading,setLoading] = useState(false);
  const savePlayer = async(e) => {
        e.preventDefault();   
        if(isValidForm()){
            var name = player1Name.trim() +"/"+player2Name.trim(); 
            setLoading(true);         
            const player = {name,school,division}
            await PlayerService.createPlayer(player).then((response) => {                     
                localStorage.message = response.data;
                navigate ('/home');
            })
            setLoading(false);             
        }
  };
  const isValidForm = () => {
    var valid = true;
        if(division.length < 1){
            inputDivision.current.style.color = "red";
            valid = false;
        }
        else {
            inputDivision.current.style.color = "black";
        }
        if (player1Name.length < 1)  { 
            inputPlayer1Name.current.style.borderColor = "red";
            valid = false;
        } else {
            inputPlayer1Name.current.style.borderColor = "black";
        }

        if (player2Name.length < 1)  { 
            inputPlayer2Name.current.style.borderColor = "red";
            valid = false;
        } else {
            inputPlayer2Name.current.style.borderColor = "black";
        }            
           
               
 
        
        return valid;
  }

  return (
    <div>
    <header>
        <Navbar /> 
     </header>
        <section>
        
        
           
     <br/> {loading?
                <div style={{marginBottom:0}}>
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
            }<br/>
    <div className = "container" style={{paddingRight:'0.75rem',paddingLeft:'0.75rem',marginLeft: 'auto',marginRight:'auto'}}>
        <div className = "row">
            <div className = "card col-md-6 offset-md-3 offset-md-3">
                <div>
                    <h2 className = "text-center">Add Player</h2>
                    <div className = "card-body">
                        <form action = "" >
                         
                            <br/>
                            <h5>Division:</h5>
                            <div className = "form-group mb-2" ref={inputDivision}>                         
                                    <input type="radio" value="JH Boys"  name="division" onChange = {(e) => setDivision(e.target.value)} /> JH Boys 
                                    <br/>
                                    <input type="radio" value="JH Girls"  name="division" onChange = {(e) => setDivision(e.target.value)}/> JH Girls
                                    <br/>
                                    <input type="radio" value="HS Boys" name="division" onChange = {(e) => setDivision(e.target.value)} /> HS Boys 
                                    <br/>
                                    <input type="radio" value="HS Girls" name="division" onChange = {(e) => setDivision(e.target.value)}/> HS Girls                              
                                
                            </div>
                            <br/>
                            <div>
                                            <h5>Player 1 Name:</h5>
                                            <input
                                                type = "text"
                                                placeholder = "Example: John Doe"
                                                name = "player1Name"
                                                ref={inputPlayer1Name}
                                                className = "form-control"
                                                value = {player1Name}
                                                onChange = {(e) => setPlayer1Name(e.target.value)} 
                                                required/>
                                            <br/>
                                            <h5>Player 2 Name:</h5>
                                            <input
                                                type = "text"
                                                placeholder = "Example: Pete Johnson"
                                                name = "player2Name"
                                                ref={inputPlayer2Name}
                                                className = "form-control"
                                                value = {player2Name}
                                                onChange = {(e) => setPlayer2Name(e.target.value)} 
                                                required/>
                                        </div>                   
                            <br/>
                                <div className = "form-group mb-2">
                                <h5> School:</h5>
                                    <input
                                        type = "text"
                                        readOnly={true} 
                                        name = "school"
                                        className = "form-control"
                                        value = {localStorage.school}
                                        onChange = {(e) => setSchool(e.target.value)}                                         
                                    />
                                </div>
                            <br/>
                            <button type="submit" className = "btn btn-primary mb-2 player-right player-left" 
                                     disabled = {loading}
                                     onClick = {(e) =>savePlayer(e)}>
                                Submit
                            </button>
                            <button className = "btn btn-primary mb-2 player-right"
                                    disabled = {loading}                                    
                                    onClick = {(e) =>navigate ('/home')}>
                                Cancel
                            </button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
        
    </div>
    </section>
    </div>
  )
}

export default AddPlayer;