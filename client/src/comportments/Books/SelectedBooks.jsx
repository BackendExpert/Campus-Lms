import Icons from "@reacticons/ionicons"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"

const SelectedBooks = () => {
    const navigate = useNavigate() 
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [SelectedBooks, SetSelectedBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/SelectedBooks')
        .then(res => (SetSelectedBooks(res.data)))
        .catch(err => console.log(err))
    }, [])

    const headleBorrow = (id) => {
        axios.post('http://localhost:8081/BorrowBook/' + id)
        .then(res => {
            if(res.data.Status === "Success"){
                alert("Book Borrow Successful")
                window.location.reload()
            }
            else{
                alert(res.data.Error)
            }
        })
    }

  return (
    <div className='bg-white py-4 px-8 my-8 rounded-2xl shadow-md'>
        <h1 className='text-gray-500 text-2xl font-semibold my-4'>All Selected Books</h1>

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
                            SelectedBooks.map((books, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {books.ISBN_No}
                                        </th>
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {books.Name}
                                        </th>
                                        <td class="px-6 py-4">
                                            {books.author1}, {books.author2}, {books.author3}
                                        </td>
                                        <td class="px-6 py-4">
                                            {
                                                (() => {
                                                    if(books.status === "Selected"){
                                                        return (
                                                            <p className="text-yellow-500 font-semibold">Selected</p>
                                                        )
                                                    }
                                                })()
                                            }
                                            
                                        </td>
                                        <td class="px-6 py-4">
                                            {
                                                (() => {
                                                    if(books.status === "Selected"){
                                                        return (
                                                            <button  onClick={() => headleBorrow(books.ID)} className="py-2 px-8 text-blue-500 font-semibold shadow-md rounded duration-500 hover:bg-blue-500 hover:text-white">
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

export default SelectedBooks