import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = (props) => {

    let isLoggedIn = props.isLoggedIn;
  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center " style={{height:'100vh',width:'100%'}}>
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">
                    React Js + Laravel CRUD With Auth
                  </div>    
                </div>
                <div className="card-body">
                    <h1>Selamat Datang</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>    
                {isLoggedIn ? (
                    <a href={'/dashboard'} className="btn btn-primary btn-sm" >Dashboard</a>
                ) : (
                    <a href={'/login'} className="btn btn-primary btn-sm" >Login</a>
                )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
