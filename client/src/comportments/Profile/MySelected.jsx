import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";

const MySelected = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");


    const [MySelected, SetMySelected] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/MySelectedBooks')
        .then(res => SetAllUser(res.data))
        .catch(err => console.log(err))
    }, [])
    
  return (
    <div>MySelected</div>
  )
}

export default MySelected