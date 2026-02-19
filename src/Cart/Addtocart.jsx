import { useEffect, useState } from "react"
import FetchApi from "../CustomHook/useFetchApi";
import axios from "axios";
import { Link } from "react-router-dom";
import "./addtocart.css"

function Addtocart() {
    let [cart, setCart] = useState([]);


    let returnData = FetchApi("http://localhost:3000/products")
    console.log(returnData, "returnfetchdata")

    function getData() {
        let filterdata = returnData.filter((val) => {
            return val.addToCart == true
        })
        setCart(filterdata)
    }

    useEffect(() => {

        getData()

    }, [returnData])

    function removeFromCart(val) {
        // debugger
        let id = val.id;
        val.addToCart = false
        val.quantity = 1

        axios.put(`http://localhost:3000/products/${id}`, val)
            .then((response) => {
                console.log(response, "response")
                getData();
            })


        // console.log(name, "from removecart")
    }

    return (
        <>
            <h1 className="headdingp">Cart</h1>
            <div className="addtocmaindiv">
                {
                    cart.map((val) => {
                        var pp = `../productdesc/${val.id}`
                        return (
                            <>
                                <div className="addtocartdiv">
                                    <div className="imgaddtocart">
                                        <Link to={pp} className='link'>
                                            <img src={val.image[0]} alt="" />
                                        </Link>
                                    </div>
                                    <div className="addtocartdiv2">
                                        <h1>{val.name}</h1>
                                        <h1>Quantity:{val.quantity}</h1>
                                    </div>
                                    <div className="addtocartdiv3">
                                        <button className="btnremove" onClick={() => { removeFromCart(val) }}>Remove</button>
                                    </div>
                                </div>

                            </>
                        )
                    })
                }
            </div>
        </>
    )


}

export default Addtocart