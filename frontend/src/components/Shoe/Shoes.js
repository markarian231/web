import React, {useEffect, useState} from "react";
import "./Shoe.css";
import axios from "axios";
import Shoe from "./Shoe";
import {useNavigate} from "react-router-dom";

const URL = "http://localhost:5000/shoes";
const fetchHandler = async () => {
    axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
    return await axios.get(URL).then((res) => res.data);
};
const Shoes = () => {

    const navigation = useNavigate()

    useEffect(() => {
        if(!localStorage.getItem("token"))
        {
            navigation("/");
        }
    },[])


    const [shoes, setShoes] = useState();
    useEffect(() => {
        fetchHandler().then((data) => setShoes(data.shoes));
    }, []);
    return (
        <div>
            <ul>
                {shoes &&
                    shoes.map((shoe, i) => (
                        <li key={i}>
                            <Shoe shoe={shoe}/>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Shoes;
