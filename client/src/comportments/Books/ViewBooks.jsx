import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const ViewBooks = () => {
  const navigate = useNavigate() 
  const RoleUser = secureLocalStorage.getItem("Login1");
  const EmailUser = secureLocalStorage.getItem("login2");

  return (
    <div className="bg-gray-200 py-2 h-auto w-full">
      <div className="bg-white mx-6 my-10 px-12 py-16 rounded-2xl shadow-md">
        {
          (() => {
            if(RoleUser !== null && EmailUser !== null){
              return (
                <Link to={'/Dashboard'}>
                  <button className="text-blue-500 font-semibold py-2 px-4 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                </Link>
              )
            }
            else{
              return (
                <Link to={'/'}>
                  <button className="text-blue-500 font-semibold py-2 px-4 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">Back</button>
                </Link>
              )
            }
          })()
        }

        <div className="">
          <h1 className="text-gray-500 text-2xl text-center font-semibold my-8">Books</h1>
        </div>

      </div>
    </div>
  )
}

export default ViewBooks