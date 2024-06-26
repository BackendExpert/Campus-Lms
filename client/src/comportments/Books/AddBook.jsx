import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const AddBook = () => {
    const navigate = useNavigate() 
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [BookData, SetBookData] = useState({
        isbnNo: '',
        bname: '',
        author1: '',
        author2: '',
        author3: '',      
    })

    const headleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8081/AddBook', BookData)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Added Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="bg-white rounded-2xl py-8 px-10 mt-6 shadow-md">
                <h1 className="font-semibold text-gray-500 text-xl">Add New Book</h1>
                <div className="my-4">
                    <form onSubmit={headleSubmit}>
                        <div className="lg:grid grid-cols-3 gap-4">
                            <div className="my-2">
                                <label htmlFor="" className="text-gray-500">ISBN Number : </label>
                                <input type="text" name="" id="" required className="w-full border border-blue-500 h-12 rounded shadow-md my-2 pl-2" placeholder="Book ISBN Number"
                                onChange={e => SetBookData({...BookData, isbnNo:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className="text-gray-500">Book Name : </label>
                                <input type="text" name="" id="" required className="w-full border border-blue-500 h-12 rounded shadow-md my-2 pl-2" placeholder="Book Name" 
                                onChange={e => SetBookData({...BookData, bname:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className="text-gray-500">Book Author 1 : </label>
                                <input type="text" name="" id="" required className="w-full border border-blue-500 h-12 rounded shadow-md my-2 pl-2" placeholder="Book Author 1" 
                                onChange={e => SetBookData({...BookData, author1:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className="text-gray-500">Book Author 2 : </label>
                                <input type="text" name="" id="" required className="w-full border border-blue-500 h-12 rounded shadow-md my-2 pl-2" placeholder="Book Author 2" 
                                onChange={e => SetBookData({...BookData, author2:e.target.value})}/>
                            </div>
                            <div className="my-2">
                                <label htmlFor="" className="text-gray-500">Book Author 3 : </label>
                                <input type="text" name="" id="" required className="w-full border border-blue-500 h-12 rounded shadow-md my-2 pl-2" placeholder="Book Author 3" 
                                onChange={e => SetBookData({...BookData, author3:e.target.value})}/>
                            </div>
                        </div>
                        <div className="my-2">
                            <button type="submit" className="py-4 px-8 w-1/2 rounded bg-green-500 shadow-md text-white duration-500 hover:bg-green-600">Add Book</button>
                        </div>
                    </form>
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

export default AddBook