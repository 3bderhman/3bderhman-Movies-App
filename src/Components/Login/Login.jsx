import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login(props) {
    const navigate = useNavigate();
    const [errorList, setErrorList] = useState([])
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const[user, setUser] = useState({
        email:'',
        password:'',
    });
    function getUser(e) {
        let myUser = {...user};
        myUser[e.target.name] = e.target.value;
        setUser(myUser);
    }
    async function formSumbit(e) {
        e.preventDefault();
        setLoading(true)
        const validattionResponse = validationRegistetForm();
        if(validattionResponse.error)
        {   
            setLoading(false)
            setErrorList(validattionResponse.error.details)
        }
        else{
            let {data} = await axios.post(`https://routeegypt.herokuapp.com/signin`, user);
            if(data.message === "success"){
                localStorage.setItem('userToken', data.token);
                props.userInfo()
                navigate('/home');
                setLoading(false);
            }
            else{
                setLoading(false);
                setError(data.message)
            }
        }    
    }
    function validationRegistetForm(){
        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });
        return schema.validate(user, {abortEarly : false})
    }
  return (
    <div>
         <div className="form-body">
                <h2 className="fs-1 fw-normal mb-4">LogIn</h2>
                <form onSubmit={formSumbit} className="mb-4">
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input onChange={getUser} type="email" className="form-input" placeholder="Email" name="email"/>
                    </div>  
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input onChange={getUser} type="text" className="form-input" placeholder="Password" name="password"/>
                    </div>
                    <button className="btn btn-info">
                        {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Login'}
                    </button>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {errorList.map((error, index) => index === 3? <div key={index} className="alert alert-danger p-2">password must has numbers and Letters</div>:
                <div key={index} className="alert alert-danger p-2">{error.message}</div> )}    
            </div>
    </div>
  )
}
