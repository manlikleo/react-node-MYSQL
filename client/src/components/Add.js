import React,{useState} from "react";
// import TutorialService from '../service/TutorialService';
import axios from 'axios';


const Add = () => {

    // initial state 
    const initialState = {
        id:null,
        title:"",
        description:"",
        published: false
    };

    //states setting
    const [tutorial,SetTutorial] = useState(initialState);
    const[submitted, setSubmitted] = useState(false);


    // handle the input with an event
    const handleInputChange = event => {
        const {name,value} = event.target;
        SetTutorial({...tutorial, [name]:value })
    };


    const saveTutorial = () => {

        let data = {
            title :tutorial.title,
            description:tutorial.description
        };

        // TutorialService.create()
        axios.post('http://localhost:8080/api/tutorials',data)
        .then (response => {
            SetTutorial({
                id:response.data.id,
                title:response.data.title,
                description:response.data,
                published: response.data.published,
            });

            setSubmitted(true)
            console.log(response.data)
        })

        .catch(e=> {
            console.log(e);
        });

    
    };

    const newTutorial = () => {
        SetTutorial(initialState);
        setSubmitted(false);
    }

    return(

        // submitted 
        <div className="submit"> 


            {submitted ? 
            (
                <div className="submit__wrapper"> 
                    <span className="submit__message">You submitted successfully !</span>
                    <button className="submit__btn" onClick={newTutorial}>Add New</button>
                </div>   
            )
            : (

                <div className="submit__form">
                    
                        <div className="submit__formcontainer">
                            <label className="submit__label">Title:</label>
                            <input type="text" className="submit__input" required value={tutorial.title} name="title" onChange={handleInputChange} placeholder="Enter Title"/>
                        </div>

                        <div className="submit__formcontainer">
                            <label className="submit__label">Description:</label>
                            <input type="text" className="submit__input"  value={tutorial.description} name="description" onChange={handleInputChange} placeholder="Enter description" required/>
                        </div>

                        <div className="submit__btncontainer">
                            <button onClick={saveTutorial} className="submit__btn"> Save Tutorial</button>
                        </div>      
                   
                </div>
            )}
        </div>

    );
};

export default Add;