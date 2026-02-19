import { useEffect, useState } from "react";
import FetchApi from "../CustomHook/useFetchApi";
import axios from "axios";
import "./addtowish.css"
import { Link } from "react-router-dom";

function Addtowishlist() {
    let [wishlist, setWishlist] = useState([]);

    let returnData = FetchApi("http://localhost:3000/products")
    console.log(returnData, "returnfetchdata")

    function getData() {
        let filterdata = returnData.filter((val) => {
            return val.addtowish == true
        })
        setWishlist(filterdata)
    }

    useEffect(() => {

        getData()

    }, [returnData])


    function removeFromwish(val) {
        let id = val.id;
        val.addtowish = false

        axios.put(`http://localhost:3000/products/${id}`, val)
            .then((response) => {
                console.log(response, "response")
                getData();
            })

    }


    return (

        <>
            <h1 className="headdingp">Wishlist</h1>
            <div className="addtowmaindiv">
                {
                    wishlist.map((val) => {
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
                                    </div>
                                    <div className="addtocartdiv3">
                                    <button className="btnremove" onClick={() => { removeFromwish(val) }}>Remove</button>
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

export default Addtowishlist