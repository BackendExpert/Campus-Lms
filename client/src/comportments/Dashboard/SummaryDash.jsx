import Icons from "@reacticons/ionicons"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import  secureLocalStorage  from  "react-secure-storage"
import CountUp from 'react-countup';
import axios from "axios";
import AllBooks from "../Books/AllBooks";
import SelectedBooks from "../Books/SelectedBooks";
import BorrowedBooks from "../Books/BorrowedBooks";
import Users from "../Users/Users";
import MySelected from "../Profile/MySelected";

const SummaryDash = () => {
    const navigate = useNavigate() 
    //curent login user
    const RoleUser = secureLocalStorage.getItem("Login1");
    const EmailUser = secureLocalStorage.getItem("login2");

    const [CountBooks, SetCoutBooks] = useState(0)
    const [CountBorrowBooks, SetCountBorrowBooks] = useState(0)
    const [CountSelectedBooks, SetCountSelectedBooks] = useState(0)
    const [CountUsers, SetCountUsers] = useState(0)
    const [MySelected, SetMySelected] = useState(0)

    const [buttonValue, SetButtonValue] = useState()
    const HeadleButtonClick = (clickValue) => {
        SetButtonValue(clickValue)   
    }

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

            try {
                const CountUsers = await axios.get('http://localhost:8081/UserCount');
                SetCountUsers(CountUsers.data.allUsers);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

            try {
                const CountMySelected = await axios.get('http://localhost:8081/MySelected/' + EmailUser);
                SetMySelected(CountMySelected.data.MySelectBK);
            } catch (error) {
                console.error('Error fetching data:', error);
            }

        }
        fetchData();
    }, [])

    const [lastThreeBooks, SetlastThreeBooks] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8081/BookLastThree')
        .then(res => (SetlastThreeBooks(res.data)))
        .catch(err => console.log(err))
    }, [])

    const [LoginUserData, SetLoginUserData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8081/LoginUser/' + EmailUser)
        .then(res => (SetLoginUserData(res.data)))
        .catch(err => console.log(err))
    }, [])

    const dataCount = [
        {id: 1, btnValue: "AllBooks", name: "Books", link: "#", value: <CountUp end={CountBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-purple-500"},
        {id: 2, btnValue: "BorrowedBook", name: "Borrowed Books", link: "#", value: <CountUp end={CountBorrowBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-red-500"}, 
        {id: 3, btnValue: "", name: "My Borrowed", link: "#", value: <CountUp end={20}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-green-500"},
        {id: 4, btnValue: "MySelected", name: "My Selected", link: "#", value: <CountUp end={MySelected}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-blue-500"},
        {id: 5, btnValue: "SelectBooks", name: "Selected Books", link: "#", value: <CountUp end={CountSelectedBooks}/>, icon: <Icons name="book" size="large"></Icons>, style: "text-yellow-500"},
        {id: 6, btnValue: "AllUsers", name: "Users", link: "#", value: <CountUp end={CountUsers}/>, icon: <Icons name="people" size="large"></Icons>, style: "text-blue-500"}, 
                
    ]

    if(RoleUser !== null && EmailUser !== null){
        return (
            <div className="py-4">
                {
                    (() => {
                        if(RoleUser === "SuperAdmin"){
                            return (
                                <h1 className="px-8 text-xl font-semibold">SuperAdmin Dashbord</h1>
                            )                            
                        }
                        else if(RoleUser === "user"){
                            return (
                                <h1 className="px-8 text-xl font-semibold">User Dashbord</h1>
                            )    
                        }
                    })()
                }
                
                <div className="mt-4 rounded pr-5">
                    <div className="lg:grid grid-cols-4 gap-4">
                        {
                            dataCount.map((data) => {
                                if(RoleUser === "SuperAdmin"){
                                    if(data.id !== 9){
                                        return (
                                            <Link to={data.link}>
                                                <div onClick={() => HeadleButtonClick(data.btnValue)} className={`cursor-pointer text-center shadow-md bg-white border-2 border-gray-200 rounded-2xl py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${data.style}`}>                                       
                                                    <p className="font-semibold text-xl">{data.icon}</p>   
                                                    <p className="font-semibold pl-2 pt-2">{data.name}</p>
                                                    <p className="font-semibold text-3xl pl-2 pt-1">{data.value}</p>
                                                </div>  
                                            </Link>
                                        )
                                    }
                                }
                                if(RoleUser === "user"){
                                    if(data.id === 3|| data.id === 4){
                                        return (                                    
                                            <Link to={data.link}>
                                                <div onClick={() => HeadleButtonClick(data.btnValue)} className={`cursor-pointer text-center shadow-2xl bg-white border-2 border-gray-200 rounded py-8 px-8 w-full mx-2 lg:my-0 my-2 duration-500 hover:text-sm ${data.style}`}>                                       
                                                    <p className="font-semibold text-xl">{data.icon}</p>   
                                                    <p className="font-semibold pl-2 pt-2">{data.name}</p>
                                                    <p className="font-semibold text-3xl pl-2 pt-1">{data.value}</p>
                                                </div>  
                                            </Link>
                                        )
                                    }
                                }
                            })
                        }
                    </div>
                </div>
                {
                    (() => {
                        if(buttonValue === "AllBooks"){
                            return (
                                <AllBooks />
                            )
                        }
                        if(buttonValue === "SelectBooks"){
                            return(
                                <SelectedBooks />
                            )
                        }
                        if(buttonValue === "BorrowedBook"){
                            return(
                                <BorrowedBooks />
                            )
                        }
                        if(buttonValue === "AllUsers"){
                            return(
                                <Users />
                            )
                        }
                        if(buttonValue === "MySelected"){
                            return(
                                <MySelected />
                            )
                        }
                    })()
                }
                <h1 className="px-8 py-8 text-xl font-semibold">Personal Data</h1>
                <div className="mb-8 mx-2">
                    <div className="lg:grid grid-cols-2 gap-4">
                        <div className="w-full shadow-md rounded-2xl bg-white py-6 px-4 lg:mr-5 mr-0 lg:my-0 my-2">
                            <h1 className="">My Info</h1>
                            {
                                LoginUserData.map((mydata) => {
                                    return (
                                        <div className="lg:grid grid-cols-2 gap-4">
                                            <div className="mx-4 my-6">
                                                <div className="">
                                                    <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="" />
                                                </div>
                                                <div className="">
                                                    <p className="py-2">Name :  {LoginUserData[0].username}</p>
                                                    <p className="py-2">Email : {LoginUserData[0].email}</p>
                                                </div>
                                            </div>
                                            <div className="">
                                                <p className="py-2">Role : {
                                                (() => {
                                                    if(LoginUserData[0].role === "user"){
                                                        return (
                                                            <span className="text-yellow-500 font-semibold">User</span>
                                                        )
                                                    }
                                                    else if(LoginUserData[0].role === "SuperAdmin"){
                                                        return (
                                                            <span className="text-red-500 font-semibold">SuperAdmin</span>
                                                        )
                                                    }
                                                })()
                                                } </p>
                                                <p className="py-2">Address : kandy</p>
                                                <p className="py-2">Name : Jehan </p>
                                                <p className="py-2">Address : kandy</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>  
                        <div className="shadow-md rounded-2xl w-full">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Trip
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            View
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Colombo
                                        </th>
                                        <td className="px-6 py-4">
                                            <Link>
                                                <button className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View</button>
                                            </Link>
                                        </td>
                                    </tr>                                
                                </tbody>
                            </table>
                        </div>
                    </div>  

                    <h1 className="px-8 py-8 text-xl font-semibold">Newly Added Books</h1>   

                    <div className="mb-8 mx-0">
                       <div className="lg:flex">
                            {
                                lastThreeBooks.map((lastBooks) => {
                                    return (
                                        <div className="bg-white rounded-2xl lg:mx-8 mx-0 shadow-md w-full">
                                            <div className="mt-8 mx-4">
                                                <h1 className="lg:py-0 pt-10">Book Name : {lastBooks.Name}</h1>
                                                <p className="">Authors : {lastBooks.author1}, {lastBooks.author2}, {lastBooks.author3}</p>
                                            </div>
                                            <div className="my-8 text-center">
                                                <Link to={'/ViewBooks'}>
                                                    <button className="font-medium py-2 px-4 text-blue-600 rounded duration-500 hover:bg-blue-500 hover:text-white hover:shadow-xl">View more</button>
                                                </Link>
                                            </div>
                                        </div> 
                                    )
                                })
                            }
                       </div>     
                    </div>          


                </div>

            </div>
        )
    }

}

export default SummaryDash