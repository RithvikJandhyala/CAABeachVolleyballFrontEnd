import React, {useState,useRef,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar';
import BarLoader from "react-spinners/BarLoader";
import SchoolService from '../services/SchoolService';

const AddSchool = () => {
  const [name,setName] = useState('');
  const [image,setImage] = useState(''); 
  const [loading,setLoading] = useState(false);
  const [school, setSchool] = useState(null);
  const inputName = useRef(); 
  const inputImage = useRef(); 

  const navigate  = useNavigate();
  useEffect(()=>{
        if(localStorage.username === undefined){
            navigate("/");
        }    
  },[]);

  
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
   }
  

   const saveSchool = async(e) => {
        e.preventDefault();   
        if(isValidForm()){
            setLoading(true); 
            const formData = new FormData();
            formData.append('name', name.trim());
            formData.append('image', image);
            await SchoolService.addSchool(formData).then((response) => {                     
                localStorage.message = 'School added successfully with ID: ' + response.data;
                console.log('School added successfully with ID:', localStorage.message);
                navigate ('/schools');
            })
            .catch(error => {
                console.error('Error adding school:', error);
            }); 
            setLoading(false);             
        }
  };
  const isValidForm = () => {
    var valid = true;
        if(name.length < 1){
            inputName.current.style.color = "red";
            valid = false;
        }
        else {
            inputName.current.style.color = "black";
        }
       /* if(image.length < 1){
            inputImage.current.style.color = "red";
            valid = false;
        }
        else {
            inputImage.current.style.color = "black";
        } */
        return valid;
  };

  return (
    <div>
    <header>
        <Navbar /> 
     </header>
    <section>
    <div>
    </div>
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
                    <br/>
                    <h2 className = "text-center">Add School</h2>
                    <div className = "card-body">
                        <form action = "" >
                            
                            
                            <div ref={inputName}>
                                <h5>School Name:</h5>
                                
                                    <input
                                        type = "text"
                                        placeholder = "Example: BASIS Scottsdale"
                                        name = "first name"
                                        ref={inputName}
                                        className = "form-control"
                                        value = {name}
                                        onChange = {(e) => setName(e.target.value)} 
                                        required />
                            </div>
                            <br/>
                            <h5 ref={inputImage}>Upload Photo:<h6>up to 1MB</h6></h5>
                            
                            <input type="file" name="image" accept="image/*"  onChange={(e) => handleImageUpload(e)} />
                            <br/><br/>
                            <button type="submit" className = "btn btn-primary mb-2 player-right player-left" 
                                     disabled = {loading}
                                     onClick = {(e) =>saveSchool(e)}>
                                Submit
                            </button> 
                            <button className = "btn btn-primary mb-2 player-right"
                                    disabled = {loading}                                    
                                    onClick = {(e) =>navigate ('/schools')}>
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

export default AddSchool;
