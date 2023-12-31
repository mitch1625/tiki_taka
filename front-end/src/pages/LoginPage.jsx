import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Button from 'react-bootstrap/Button'
import { useState, useEffect } from 'react';
import { api } from '../utilities';
import { useNavigate } from 'react-router-dom';
import { useOutletContext } from "react-router-dom";


const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {user, setUser} = useOutletContext()
    const [wrongCredential, setWrongCredential] = useState(false)

    const login = async(e) => {
      e.preventDefault()
      let response = await api.post("users/login/", {
        email: email,
        password : password
      })
      .catch((err)=>{
        if (err.response.status===404){
          setWrongCredential(true)
        }
      })
      if (response.status === 200){
        setUser(response.data.email);
        localStorage.setItem("token", response.data.token)
        api.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        navigate("/")
      } else {
        alert("something went wrong")
      }
    };

    // useEffect(()=>{
    //   setWrongCredential(true)
    // },[login()])

    return (
    <>
    <div style={{height:'100vh'}}>
    <div style={{display:'flex', justifyContent:'center'}}>
        <img id='welcome-banner' src="../src/assets/welcome-banner1.png"/>
    </div>
    <h1 style={{textAlign: 'center', marginTop:'20px'}}>Tiki Taka</h1>
    <Form onSubmit={(e) => login(e)} className='form-field'>
        <div id='loginbox'>
      <FloatingLabel 
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
        <Form.Control 
        type="email" 
        placeholder="name@example.com" 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" style={{color:'black'}}>
        <Form.Control 
        type="password" 
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />
      </FloatingLabel>
      </div>
      <div style={{color:'#970E0E', fontWeight:'bold', fontSize:'25px', alignSelf:'center'}}>
      {wrongCredential ? 
      'Email or Password Incorrect.'
      : 
      null
    }
    </div>
    <Button id='login-button' active style={{backgroundColor:'#D5386B', color:'#EDF5E1', marginTop:'20px'}} variant="dimgrey" type="submit" size='lg'>Login</Button>
    </Form>
    </div>
    </>
    )
}

export default LoginPage