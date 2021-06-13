import React,{useState,useEffect} from 'react';
// import backend from '../service/TutorialService';
import axios from 'axios';
import {Link} from 'react-router-dom';
import '../css/style.min.css'

const List = () => {

    const [tutorials,setTutorials] = useState([]),
    [currentTutorial,setCurrentTutorial] = useState(null),
    [currentIndex,setCurrentIndex] = useState(-1),
    [searchTitle,setSearchTitle] = useState("");

    useEffect(() => {retrieveTuts()},{})

    const refreshlist = () => {
        retrieveTuts();
        setCurrentTutorial(null)
        setCurrentIndex(-1)
    }

    const retrieveTuts = () => {
        axios.get("http://localhost:8080/api/tutorials")
        .then(response => {
            setTutorials(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };


    const setActiveTutorial = (tutorial,index) => {
        setCurrentTutorial(tutorial);
        setCurrentIndex(index);
    };


    const removeAllTutorial = () =>{
        axios.delete('http://localhost:8080/api/tutorials')
        .then(response => {
            console.log(response.data);
            refreshlist()
        })
        .catch(e => {
                console.log(e);
        })
    };

    
    const findByTitle = () => {
        axios.get(`http://localhost:8080/api/tutorials?title=${searchTitle}`)
        .then(res => {
            setTutorials(res.data);
             
        })
        .catch(e => {
            console.log(e);
        });

    }


    return(

        <div className="container">

            <div className="container__search">
                <input className="container__searchcom"  type="search" value={searchTitle} onChange={onChangeSearchTitle} placeholder="Search By Title" required/>
                <button onClick={findByTitle} className="container__btn">Search</button>
            </div>

            <div className="container__content">

                <div className="container__list">
                    <h2 className="container__listtitle">Content List</h2>

                    <div className="container__cards">

                        {tutorials && tutorials.map((tutorial, index)=>(
                            
                            <div className={"container__card " + (index === currentIndex ? "active": "" )} onClick={()=> setActiveTutorial(tutorial, index)} key={index}>
                                {tutorial.title}
                            </div>
                            ))}
                    </div>

                    <button type="submit" onClick={removeAllTutorial} className="container__clearbtn">Clear All</button>

                </div>

                <div className="container__information">

                <h2 className="container__infotitle">Tutorials</h2>

                    { currentTutorial ? 

                        <React.Fragment>
                            <p className="container__contentinfo"> Title: {""}{currentTutorial.title}</p>
                            <p className="container__contentinfo"> Description:{currentTutorial.description}</p>
                            <p className="container__contentinfo "> status:{""}{currentTutorial.published ? "published": "pending"}</p>
                            <Link className="container__editbtn" to={"/tutorials/" + currentTutorial.id} type="submit">edit</Link>
                        </React.Fragment> : (
                                <p> Please click on tutorials </p>
                        )}


                </div>
            </div>
        </div>
    )

};

export default List;