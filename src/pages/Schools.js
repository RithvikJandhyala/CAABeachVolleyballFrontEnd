import React,{useEffect} from 'react'
import Navbar from '../components/Navbar';
import SchoolsReactTable from '../components/reactTables/SchoolsReactTable';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
    import 'react-toastify/dist/ReactToastify.css';


const Schools=()=>{
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }
        if(localStorage.role !== "Admin"){
            navigate("/home");
        }
         // show any toast messages
         if(localStorage.message !== undefined && localStorage.message.length > 0 && localStorage.role === "Admin"){
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
                <SchoolsReactTable/>
            </section>
    
        </div>
    )
}

export default Schools;