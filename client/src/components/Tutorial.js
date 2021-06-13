import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/style.min.css'

const Tutorial = props => {

    const initialState = {
        id:null,
        title:"",
        description:"",
        published:false
    }

    const [currentTutorial,setCurrentTutorial] = useState(initialState);
    const [message,setMessage] = useState("")


    const getTutorial = id => {

        axios.get('http://localhost:8080/api/tutorials/' + id)
        .then(res => {
            setCurrentTutorial(res.data);
            console.log(res.data)
        })

        .catch(e => {
            console.log(e)
        })
    }


    const handleChangeInput = e => {
        const {name,value} = e.target;
        setCurrentTutorial({...currentTutorial, [name]: value});
    }


    useEffect( () => {
        getTutorial(props.match.params.id)
    },[props.match.params.id]);



    const updatePublished = status => {

        var data = {
            id: currentTutorial.id,
            title : currentTutorial.title,
            description : currentTutorial.description,
            published : currentTutorial.status
        }

            axios.get('http://localhost:8080/api/tutorials/'+ currentTutorial.id)
            .then(res => {
                setCurrentTutorial({...currentTutorial,published:status})
                console.log(res.data)
            })

            .catch(e => {
                console.log(e)
            })
    };


    const updateTutorial = () => {

        axios.post(`http://localhost:8080/api/tutorials/${currentTutorial.id}`, currentTutorial)
        .then (res => {
            console.log(res.data)
            setMessage('Tutorial updated successfully')
        })

        .catch(e => {
            console.log(e)
        })
    }

    // const deleteTutorial =()=> {
    //     axios.
    // }

    return(
        <div className="submit">
            {currentTutorial ? (

                <div className="submit__form">

                        <h2 className="submit__edittitle">Content</h2>

                        <div className="submit__formcontainer">
                            <label className="submit__label">Title:</label>
                            <input type="text" className="submit__input"  name="title"  placeholder="Enter Title"
                                value={currentTutorial.title}
                                onChange={handleChangeInput}
                            />
                        </div>

                        <div className="submit__formcontainer">
                            <label className="submit__label">Description:</label>
                            <input type="text" className="submit__input"   name="description"  placeholder="Enter description" 
                                value={currentTutorial.description}
                                onChange={handleChangeInput}
                            required/>
                        </div>

                        <div className="submit__container">
                            <p>Status: {currentTutorial.published? "published": "pending"}</p>
                        </div>  

                        <div className="submit__container">

                            {currentTutorial.published ? (
                                  <button className="submit__smallbtn" onClick={()=> updatePublished(false)}>unPublish</button>
                            ): (<button className="submit__smallbtn" onClick={()=> updatePublished(true)}>Publish</button>
                            
                            )}
                          

                    

                            <button className="submit__smallbtn">Delete</button>
                            <button className="submit__smallbtn" onClick= {updateTutorial}>Update</button>
                        </div>      

                </div>


            ): (
                <div>
                     <p> Error kindly return to all tutorials</p>
                <Link to={'/tutorials'}>Return Home</Link>
            
                </div>
               
            )}
            
        </div>
    )


};

export default Tutorial;