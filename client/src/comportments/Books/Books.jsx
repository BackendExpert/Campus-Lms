import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import AddBook from "./AddBook";
import axios from "axios";
import AllBooks from "./AllBooks";
import BorrowedBooks from "./BorrowedBooks";


const Books = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }
    const [CountBooks, SetCoutBooks] = useState(0)
    const [CountBorrowBooks, SetCountBorrowBooks] = useState(0)
    const [CountSelectedBooks, SetCountSelectedBooks] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const BKCount = await axios.get('http://localhost:8081/BooksCount');
                SetCoutBooks(BKCount.data.BKs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const BorrowBKCount = await axios.get('http://localhost:8081/BorrowBooksCount');
                SetCountBorrowBooks(BorrowBKCount.data.BorrowBks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            
            try {
                const SelectedBKCount = await axios.get('http://localhost:8081/SelectedBooksCount');
                SetCountSelectedBooks(SelectedBKCount.data.SeletedBks);
            } catch (error) {
                console.error('Error fetching data:', error);
            }


        }
        fetchData();
    }, [])

    const BookData = [
        {id: 1, btnValue: "Books", name: "Books", value: <CountUp end={CountBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-green-500'},
        {id: 2, btnValue: "bkBorrow", name: "Books Borrowed", value: <CountUp end={CountBorrowBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-red-500'},
        {id: 3, btnValue: "bkSelected", name: "Books Selected", value: <CountUp end={CountSelectedBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: 'text-yellow-500'},
        {id: 4, btnValue: "add_book", name: "Add New Book", icon: <Icons name="add" size="large"></Icons>, style: 'text-white bg-green-500'},
    ]

    if(RoleUser === "SuperAdmin"){
        return (
            <div className="py-4 px-4">
                <div className="">
                    <h1 className="px-4 py-2 text-xl font-semibold">Books</h1>
                </div>
                <div className="">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            BookData.map((Book) => {
                                if(Book.id !== 4){
                                    return (
                                        <div onClick={() => HeadleButtonClick(Book.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Book.style}`}>                                       
                                            <p className="font-semibold text-xl">{Book.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Book.name}</p>
                                            <p className="font-semibold text-3xl pl-2 pt-1">{Book.value}</p>
                                        </div>  
                                    )
                                }
                                else{
                                    return (
                                        <div onClick={() => HeadleButtonClick(Book.btnValue)} className={`cursor-pointer text-center shadow-md border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${Book.style}`}>                                       
                                            <p className="font-bold text-xl">{Book.icon}</p>   
                                            <p className="font-semibold pl-2 pt-2">{Book.name}</p>
                                        </div>  
                                    )
                                }
                            })
                        }
                    </div>
                </div>
                {/* <p>{buttonValue}</p> */}
                {
                    (() => {
                        if(buttonValue === "add_book"){
                            return (
                                <AddBook />
                            )
                        }
                        if(buttonValue === "Books"){
                            return (
                                <AllBooks />
                            )
                        }
                        if(buttonValue === "bkBorrow"){
                            return (
                                <BorrowedBooks />
                            )
                        }
                        if(buttonValue === "bkSelected"){
                            return (
                                <BorrowedBooks />
                            )
                        }
                    })()
                }
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

export default Books