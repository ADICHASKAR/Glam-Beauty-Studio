import { useContext, useEffect, useRef, useState } from "react"
import createStore from "../Context/createStore"
import "./Nav.css"
// import axios from "axios"
import { Link, useLocation, } from "react-router-dom"
import FetchApi from "../CustomHook/useFetchApi"

function Nav() {
    let ref1 = useRef();
    let { setData, data } = useContext(createStore)
    let [apiData, setApiData] = useState([])
    let [filterData, setFilterData] = useState([])
    let { pathname } = useLocation()

    let returnData = FetchApi("http://localhost:3000/products")
    console.log(returnData, "returnfetchdata")

    useEffect(() => {
        setApiData(returnData)
        setFilterData(returnData)
    }, [returnData])
    useEffect(() => {
        // debugger
        let filterData1 = apiData.filter((val) => {
            if (data != "") {
                return val.name.toLowerCase().includes(data.toLowerCase())
            }
        })
        console.log(filterData1, "filterData1")
        setFilterData(filterData1)
    }, [data])


    function showSearchBox(e) {
        setData(e.target.value)
        // debugger
        if (pathname == "/") {

            // document.getElementById('pp').style.display = "block"
            ref1.current.style.display = "none"

        } else {
            // setData(e.target.value)
            // document.getElementById('pp').style.display = "none"
            ref1.current.style.display = "block"
        }
    }

    return (
        <div className="Navb">
            <div className="logoname">
                <ul>
                    <li>
                        <Link to="/" className='link'> GLAM BEAUTY <br/> STUDIO</Link>

                    </li>
                    </ul>
            </div>
            <div>
                <ul>
                    <li>
                        <Link to="/" className='link'> Home</Link>

                    </li>
                    <li>

                        <Link to="/cart" className="link">Cart</Link>
                    </li>
                    <li>

                        <Link to="/wishlist" className="link">Wishlist</Link>
                    </li>
                    <li>

                        <Link to="/category" className="link">Category</Link>
                    </li>



                </ul>
            </div>
            <div className="navsearch">

                <input type="search" onChange={(e) => { showSearchBox(e) }} placeholder="Search" />
                {
                    filterData != "" ?
                        <div ref={ref1} className='searchBox' id='pp'>
                            <ul className="searchdul">
                                {
                                    filterData.map((val) => {
                                        var pp = `productdesc/${val.id}`
                                        return (
                                            <>
                                                <Link to={pp} className='link'>
                                                    <li>{val.name}</li>
                                                </Link>
                                            </>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        : <div className='searchBox' style={{ display: "none" }} id='pp'></div>
                }
            </div>
        </div>
    )

}

export default Nav