import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import React /*, { Component } */ from 'react';

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z]{3,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = data;

    if (!validateName(firstName) || !validateName(lastName)) {
      alert("Imię i nazwisko powinny składać się z minimum 3 liter i nie zawierać cyfr.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Podaj poprawny adres e-mail.");
      return;
    }

    try {
      const url = "http://localhost:5000/auth/register";
      const { data: res } = await axios.post(url, { firstName, lastName, email, password });

      if (res.message !== "Email already exists") {
        navigate("/");
      } else {
        alert("Podany adres email już istnieje.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className="main_container">
      <div>
        <form className="form_container" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: "50px", fontWeight: "bold", color: "#4D8076" }}>
            Create Account
          </h1>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            onChange={handleChange}
            value={data.firstName}
            required
            className="input"
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            onChange={handleChange}
            value={data.lastName}
            required
            className="input"
          />
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
                Sign Up
                </button>
            <Link to="/">

            <button type="submit" style={{ backgroundColor: "#4D8076" }}>
              Sing In
            </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
