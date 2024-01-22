import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./style.css";
import { useNavigate } from "react-router-dom";
import React, { Component } from "react";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/auth/login";
      const { data: res } = await axios.post(url, data)
      
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken);
        navigate("/shoes");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
        
      ) {
        alert("Niepoprawne dane logowania.");
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="main_container">
      <div className="login_form">
        <form className="form_container" onSubmit={handleSubmit}>
          <h1 style={{ fontSize: "50px", fontWeight: "bold", color: "#4D8076" }}>
            Shoe Store
          </h1>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className="input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className="input"
          />
          <div>
            <button type="submit" style={{ backgroundColor: "#4D8076" }}>
              Sing In
            </button>
            <Link to="/signup">
              <button type="button" style={{ backgroundColor: "#4D8076" }}>
                Sing Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
