import React, { useEffect, useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar } from "@mui/material";
import { NavLink } from "react-router-dom";
import axios from "axios";

const logout = () => {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
  }
};

const Header = () => {
  const [value, setValue] = useState();
  const [user, setUser] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    axios
      .get("http://localhost:5000/auth/current", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <AppBar
        sx={{
          backgroundColor: "#4D8076",
          height: "100px",
        }}
        position="sticky"
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px", 
          }}
        >
          <Tabs
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center", 
            }}
            textColor="inherit"
            indicatorColor="primary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab
              LinkComponent={NavLink}
              to="/add"
              label="Add shoe"
              style={{ color: "#C4FCEF", fontWeight: "bold", fontSize: "20px" }}
            />
            <Tab
              LinkComponent={NavLink}
              to="/shoes"
              label="Shoes"
              style={{ color: "#C4FCEF", fontWeight: "bold", fontSize: "20px" }}
            />
          </Tabs>
          <div style={{ textAlign: "center", flex: 1 }}>
            <h1
              style={{
                color: "#C4FCEF",
                fontSize: "60px",
                fontWeight: "bold",
                margin: 20, // Usunięcie domyślnego marginesu
              }}
            >
              Shoe Store
            </h1>
          </div>
          <Button
            onClick={logout}
            LinkComponent={NavLink}
            to="/"
            style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}
          >
            Logout ({user.firstName} {user.lastName})
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
