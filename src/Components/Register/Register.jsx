import React, { useState } from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate = useNavigate();
    const [errorList, setErrorList] = useState([])
    const[error, setError] = useState('');
    const[loading, setLoading] = useState(false);
    const[user, setUser] = useState({
        first_name:'',
        last_name:'',
        email:'',
        password:'',
        age:0
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
            let {data} = await axios.post(`https://routeegypt.herokuapp.com/signup`, user);
            if(data.message === "success"){
                setLoading(false);
                navigate('/login')
            }
            else{
                setLoading(false);
                setError(data.message)
            }
        }    
    }
    function validationRegistetForm(){
        let schema = Joi.object({
            first_name: Joi.string().min(3).max(30).required(),
            last_name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
            age: Joi.number().min(16).max(60).required()
        });
        return schema.validate(user, {abortEarly : false})
    }
    return (
        <div>
            <div className="form-body">
                <h2 className="fs-1 fw-normal mb-4">Register</h2>
                <form onSubmit={formSumbit} className="mb-4">
                    <div className="mb-3">
                        <label className="form-label">First Name</label>
                        <input onChange={getUser} type="text" className="form-input" placeholder="First Name" name="first_name"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Second Name</label>
                        <input onChange={getUser} type="text" className="form-input" placeholder="Second Name" name="last_name"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input onChange={getUser} type="email" className="form-input" placeholder="Email" name="email"/>
                    </div>  
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input onChange={getUser} type="text" className="form-input" placeholder="Password" name="password"/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Age</label>
                        <input onChange={getUser} type="number" className="form-input" placeholder="Age" name="age"/>
                    </div>
                    <button className="btn btn-info">
                        {loading ? <i className="fas fa-circle-notch fa-spin"></i> : 'Register'}
                    </button>
                </form>
                {error && <div className="alert alert-danger">{error}</div>}
                {errorList.map((error, index) => index === 3? <div key={index} className="alert alert-danger p-2">password must has numbers and Letters</div>:
                <div key={index} className="alert alert-danger p-2">{error.message}</div> )}    
            </div>
        </div>
    )
}
