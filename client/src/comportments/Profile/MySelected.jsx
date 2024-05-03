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
        axios.get('http://localhost:8081/MySelectedBooks/' + EmailUser)
        .then(res => SetAllUser(res.data))
        .catch(err => console.log(err))
    }, [])
    
    if(RoleUser !== null && EmailUser !== null) {
        return (
            <div className='bg-white py-4 px-8 my-8 rounded-2xl shadow-md'>
                <h1 className='text-gray-500 text-2xl font-semibold my-4'>All Books</h1>
        
                <div className="">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Book ISBN
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Books Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Authors
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    MySelected.map((MyBk, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {MyBk.ISBN_No}
                                                </th>
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {MyBk.Name}
                                                </th>
                                                <td class="px-6 py-4">
                                                    {MyBk.author1}, {MyBk.author2}, {MyBk.author3}
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className="text-yellow-500 font-semibold">Seleted</p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    {
                                                        (() => {
                                                            if(MyBk.status === "Borrow"){
                                                                return (
                                                                    <button className="py-2 px-8 text-red-500 font-semibold shadow-md rounded duration-500 hover:bg-red-500 hover:text-white">
                                                                        Return
                                                                    </button>
                                                                )
                                                            }
                                                            else{
                                                                return (
                                                                    <button className="py-2 px-8 text-blue-500 font-semibold shadow-md rounded duration-500 hover:bg-blue-500 hover:text-white">
                                                                        Borrow
                                                                    </button>
                                                                )
                                                            }
                                                        })()
                                                    }
        
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
    else{
        useEffect(() => {
            localStorage.clear()
            navigate('/')
        }, [])
    }

}

export default MySelected