import React,{useEffect} from 'react'
import Navbar from '../components/Navbar';
import PlayerMatchesReactTable from '../components/reactTables/PlayerMatchesReactTable';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PlayerMatches=()=>{
    const navigate=useNavigate();
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
    }); 
    return(
        <div>
            <header>
                <Navbar /> 
            </header>
            <section>
                <ToastContainer/> 
                <PlayerMatchesReactTable/>
            </section>
        </div>
    )
}
export default PlayerMatches
