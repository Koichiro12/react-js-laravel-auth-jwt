import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_LOGOUT_URL, API_ME_URL } from "../../Components/Constant/APIConstant";

const Dashboard = (props) => {
  let token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [user,setUser] = useState({})
  const fetchData = async () =>{
        axios.defaults.headers.common['Authorization'] = "Bearer "+token;
        await axios.get(API_ME_URL).then((response) => {
            if(response.data.name != undefined){
                setUser(response.data);
            }else{
                localStorage.removeItem('token');
                navigate('login')
            }
            
        })
  }

  const HandleLogout = async () => {

    axios.defaults.headers.common['Authorization'] = "Bearer "+token;
    await axios.post(API_LOGOUT_URL).then(() => {
        localStorage.removeItem('token')
        navigate('/')
    })
  }


  useEffect(()=>{
    if(!token){
        navigate('login')
    }
    fetchData();
  },[])

  return (
    <>
      <div className="container">
        <div
          className="d-flex align-items-center "
          style={{ height: "100vh", width: "100%" }}
        >
          <div className="row justify-content-center" style={{ width: "100%" }}>
            <div className="col-md-6">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Dashboard</div>
                </div>
                <div className="card-body">
                  <h1>Hi, {user.name}</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                 
                    <button onClick={HandleLogout} className="btn btn-primary btn-sm">
                      Log Out
                    </button>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
