import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const ViewBooks = () => {
  return (
    <div className="bg-gray-200 py-2 h-auto w-full">
      <div className="bg-white mx-6 my-10 px-12 py-16 rounded-2xl shadow-md">ViewBooks</div>
    </div>
  )
}

export default ViewBooks