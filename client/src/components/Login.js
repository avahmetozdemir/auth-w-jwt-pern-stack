import React, { Fragment,useState } from 'react'
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'



function Login({setAuth}) {
const [inputs,setInputs] = useState({
    email :"", 
    password: ""
})

const {email,password} = inputs

const onSubmitForm =async(e)=> {
    e.preventDefault()
    try {
        const body = {email,password}
        const response = await fetch('http://localhost:5000/auth/login', {
            method :'POST',
            headers : {'Content-Type' : 'application/json'},
            body: JSON.stringify(body)
        })

        const parseResponse = await response.json()
        console.log(parseResponse);
        if(parseResponse.token) {

        localStorage.setItem('token', parseResponse.token)
        setAuth(true)
        toast.success('login successfully')
        } else {
            setAuth(false)
            toast.error(parseResponse)
        }
    } catch (error) {
        console.log(error.message);
    }
}


const onChange=(e)=> {
    setInputs({...inputs, [e.target.name] : e.target.value})
}

  return (


    <Fragment>
        <h1 className='text-center my-5'>Login</h1>
        <form onSubmit={onSubmitForm}>
            <input className='form-control my-3' type="email" name='email' placeholder='email' onChange={e =>onChange(e)} />
            <input className='form-control my-3' type="password" name='password' placeholder='password'  onChange={e =>onChange(e)} />
            <button className='btn btn-success btn-block'>Login</button>
        </form>
        <Link to='/register'>Register</Link>
    </Fragment>
  )
}

export default Login