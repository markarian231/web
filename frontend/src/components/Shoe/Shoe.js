import {Button} from "@mui/material";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import "./Shoe.css";
import React, { Component }  from 'react';

const Shoe = (props) => {
    const history = useNavigate();
    const {_id, name, producent, description, price, image, available} = props.shoe;
    const deleteHandler = async () => {
        axios.defaults.headers.common['x-access-token'] = localStorage.getItem("token");
        await axios
            .delete(`http://localhost:5000/shoes/${_id}`)
            .then((res) => res.data)
            .then(() => history("/"))
            .then(() => history("/shoes"));
    };

    return (
        <div className="card">
            <img src={image} alt={name}/>
            <h3>{producent}</h3>
            <h3>{name}</h3>
            <h3>{price} PLN</h3>
            {available ? <h4>Dostępny</h4> : <h4>Niedostępny</h4>}
            <p>{description}</p>
            
            
            <Button LinkComponent={Link} to={`/shoes/${_id}`} sx={{mt: "auto"}}>
                Update
            </Button>
            <Button color="error" onClick={deleteHandler} sx={{mt: "auto", width: "100%"}}>
                Delete
            </Button>
        </div>
    );
};

export default Shoe;
