import React,{Fragment,useEffect,useState} from 'react'
import {toast} from 'react-toastify'

function Dashboard({setAuth}) {
    const [name,setName] = useState('')
    
    async function getName(){
        try {
            const response = await fetch('http://localhost:5000/dashboard/',{
                method: 'GET',
                headers: {token: localStorage.token}
            })

            const parseResponse = await response.json()

            setName(parseResponse.user_name)

        } catch (error) {
            console.error(error.message)
        }

    }

    useEffect(()=> {
        getName()
    },[])

    const logout = (e)=> {
        e.preventDefault()
        localStorage.removeItem('token')
        setAuth(false)

        toast.success('Logged out successfully')
    }



  return (
    <Fragment>
        <h1>Dashboard {name}</h1>
        <button className='btn btn-primary' onClick={(e)=> logout(e)} >Log out</button>
    </Fragment>
  )
}

export default Dashboard