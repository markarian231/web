import React, { useEffect, useState } from "react";
import { Button, Checkbox, FormControlLabel, FormLabel, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddShoe = () => {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    producent: "",
    image: "",
  });
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history("/");
    }
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    console.log(localStorage.getItem("token"));
    await axios
      .post(
        "http://localhost:5000/shoes",
        {
          name: String(inputs.name),
          producent: String(inputs.producent),
          description: String(inputs.description),
          price: Number(inputs.price),
          image: String(inputs.image),
          available: Boolean(checked),
        },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      )
      .then((res) => res.data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs, checked);
    sendRequest().then(() => history("/shoes"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center" // Dodane stylizacje dla wysrodkowania
        maxWidth={700}
        marginLeft="auto"
        marginRight="auto"
        marginTop={10}
      >
        <FormLabel>Name</FormLabel>
        <TextField value={inputs.name} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="name" />
        <FormLabel>Producent</FormLabel>
        <TextField
          value={inputs.producent}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="producent"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <FormLabel>Image</FormLabel>
        <TextField value={inputs.image} onChange={handleChange} margin="normal" fullWidth variant="outlined" name="image" />
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />}
          label="Available"
        />

        <Button variant="contained" type="submit" style={{ backgroundColor: "#4D8076", marginTop: 10 }}>
          <span style={{ fontSize: "1.2rem" }}>Add Shoe</span>
        </Button>
      </Box>
    </form>
  );
};

export default AddShoe;
