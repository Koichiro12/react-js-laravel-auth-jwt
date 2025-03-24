import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_LOGIN_URL } from "../../Components/Constant/APIConstant";

export const Login = (props) => {
  let isLoggedIn = props.isLoggedIn;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [validation, setValidation] = useState({});


  useEffect(() =>{
    if(isLoggedIn){
        navigate('/');
    }
},[])
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fD = new FormData();
    fD.append("email", email);
    fD.append("password", password);

    await axios
      .post(API_LOGIN_URL, fD)
      .then((response) => {
        localStorage.setItem("token", response.data.access_token);
        navigate('/dashboard')
      })
      .catch((error) => {
        console.log(error.response.data);
        setValidation(error.response.data);
      });
  };

  return !isLoggedIn ? (
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
                  <div className="card-title">Login</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    {validation.error && (
                      <div className="alert alert-danger">
                        {validation.error}
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="form-control"
                      />
                      {validation.email && (
                        <p className="text-danger text-sm">
                          {validation.email[0]}
                        </p>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control"
                      />
                      {validation.password && (
                        <p className="text-danger text-sm">
                          {validation.password[0]}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Log in
                    </button>
                    <a href={'/'} className="btn btn-sm btn-danger">Back To Home</a>
                    </div>
                    <p>Belum punya akun ? Daftar <a href={'register'}>disini</a></p>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    navigate("/")
  );
};
