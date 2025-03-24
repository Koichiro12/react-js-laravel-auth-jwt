import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_REGISTER_URL } from '../../Components/Constant/APIConstant';

const Register = () => {

    const navigate = useNavigate();

    const [validation,setValidation] = useState({});
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [password,setPassword] = useState("")
    const [passwordConfirmation,setPasswordConfirmation] = useState("")


    const handleSubmit = async (e) =>{
        e.preventDefault()

        const formData = new FormData();
        formData.append('name',name);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('password_confirmation',passwordConfirmation);

        await axios.post(API_REGISTER_URL,formData).then(()=>{
            navigate('/login')
        }).catch((error) =>{
            setValidation(error.response.data);
        })
        
    }

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
                  <div className="card-title">Register</div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="card-body">
                    {validation.error && (
                      <div className="alert alert-danger">
                        {validation.error}
                      </div>
                    )}
                    {validation.message && (
                      <div className="alert alert-danger">
                        {validation.message}
                      </div>
                    )}
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="form-control"
                      />
                      {validation.name && (
                        <p className="text-danger text-sm">
                          {validation.name[0]}
                        </p>
                      )}
                    </div>
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
                    <div className="form-group">
                      <label htmlFor="password_confirmation">Password Confirmation</label>
                      <input
                        type="password"
                        id="password_confirmation"
                        value={passwordConfirmation}
                        placeholder="Password Confirmation"
                        onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                      Register
                    </button>
                    <a href={'/'} className="btn btn-sm btn-danger">Back To Home</a>
                    </div>
                    <p>Sudah Punya akun ? Login <a href={'login'}>disini</a></p>
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register