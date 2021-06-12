import React,{useState,useEffect} from 'react';
// import backend from '../service/TutorialService';
import axios from 'axios';
import {Link} from 'react-router-dom';

const List = () => {

    const [tutorial,setTutorials] = useState([]),
   [currentTutorial,setCurrentTutorial] = useState(null),
    [currentIndex,setCurrentIndex] = useState(-1),
    [searchTitle,setSearchTitle] = useState("");

    useEffect(() => {
        retrieveTuts()
    },{})


    return(
        <div>Hello</div>
    )

};

export default List;