    import React,{useEffect,useState} from 'react'
    import Navbar from '../components/Navbar';
    import PlayersReactTable from '../components/reactTables/PlayersReactTable';
    import SchoolService from '../services/SchoolService';
    import {useNavigate} from "react-router-dom";
    import * as AiIcons from 'react-icons/ai';
    import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';

    const Players=()=>{ 
        const navigate=useNavigate();
        const [logo,setLogo]=useState("");
        const[loading,setLoading] = useState(false);
        const [schoolImages, setSchoolImages] = useState([]);
        const [isSchoolImagesLoaded, setIsSchoolImagesLoaded] = useState(false);
        useEffect(()=>{
    
            if(localStorage.username === undefined){
                navigate("/");
            }       
          
            // show any toast messages
            if(localStorage.message !== undefined && localStorage.message.length > 0){
                toast.success(localStorage.message, {
                    position: toast.POSITION.TOP_CENTER
                });
                localStorage.message ="";
            }
            if(localStorage.role == "Admin"){
                navigate("/all-players");
            }

            // get Schools
            SchoolService.getSchools().then((response) => {                 
                for(var i = 0; i < response.data.length; i++) 
                {
                        {schoolImages.push({
                            name: response.data[i].name,
                            image: response.data[i].image,
                        });
                    }
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
    

        return(
            <div> 
                <header>               
                    <Navbar/>
                </header>
                <section>
                    <div>
                        <ToastContainer/>               
                        <h5>
                            <span className = "name"/>                   
                            <span className = "school">                           
                                {localStorage.school}
                                {isSchoolImagesLoaded  && (
                                    <img src={`data:image/jpeg;base64,${getImage(localStorage.school)}`}  style={{ width: 50, height:50,marginLeft: 10 }} className = 'player1'/>  
                                )}            
                            </span>
                        </h5>
                        
                    </div>
                    <h1 className = "page-name" style = {{marginLeft: '17%',fontFamily: "revert-layer"}}><AiIcons.AiOutlineUser style={{ marginBottom: 10 ,marginRight: 5}}/>My Players</h1>
                    <PlayersReactTable/>
                </section>
            </div>
        )
    }
    export default Players