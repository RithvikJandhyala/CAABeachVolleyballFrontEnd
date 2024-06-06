import React,{} from 'react'
import Modal from 'react-modal';
import {useNavigate} from 'react-router-dom'

const IdleModal=({idle,setIdle})=>{
    const navigate  = useNavigate();
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    return(
        <Modal isOpen={idle} style={customStyles}>
        <div>
            <h1>Your session is about to end</h1>
           < div className = "card-body" style={{textAlign:"center"}}>
            <button className = "btn btn-primary" style={{width:"20%" ,marginRight:"2%",display:"inline"}} onClick={()=>{setIdle(false)}}>Continue</button>
            <button className = "btn btn-primary" style={{width:"20%",display:"inline"}} onClick={()=>{
                navigate('/');
                setIdle(false);
                localStorage.clear()}}>
                Log Out
            </button>
            </div>
        </div>
        </Modal>
    )

}

export default IdleModal;