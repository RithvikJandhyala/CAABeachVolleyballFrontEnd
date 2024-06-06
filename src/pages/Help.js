import React,{useState} from 'react';
import Navbar from '../components/Navbar';
import * as BiIcons from 'react-icons/bi';


function Help() {
    const [cards] = useState([
        {
            title: 'Contact Us:',
            text: 'For additional questions, email aweber@azcaapreps.com or ricky.jandhyala@gmail.com'
        },
        {
            title: 'How To Use The Platform',
            text: 'If unsure how to use the platform, watch the demo video below'
        },{
            title: 'Creator',
            text: 'Platform created and designed by Rithvik Jandhyala. This Platform was created using React, Springboot and MongoDB. Copyright @CAABeachVolleyball'
        }
    ])
  return (
    <div>
        <header>
            <Navbar /> 
        </header>
        <section>
            <h1 className = "text-center" style={{marginBottom: 30}}><BiIcons.BiHelpCircle style = {{marginRight:3,marginBottom: 8}}/>Help</h1>
            <div className = "helpcontainer">
           
                <div className='helpcards'>
                    {cards.map((card,i) => (
                        <div key = {i}className='helpcard'>
                            <h4 style={{marginBottom: 10}} >{card.title}</h4>
                            <h6>
                                {card.text}
                            </h6>
                        </div>

                        ))
                    }
                  

                </div>
            </div>
        </section>
    </div>
  )
}
export default Help;