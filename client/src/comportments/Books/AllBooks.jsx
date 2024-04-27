import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const AllBooks = () => {
    const navigate = useNavigate() 
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [AllBooks, SetAllBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/AllBooks')
        .then(res => (SetAllBooks(res.data)))
        .catch(err => console.log(err))
    }, [])

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
                            AllBooks.map((books, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {books.ISBN_No}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {books.Name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {books.author1},{books.author2},{books.author3},
                                        </td>
                                        <td class="px-6 py-4">
                                            {books.status}
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

export default AllBooks

