import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
// import "./Product.css"
import { Link } from 'react-router-dom'
import createStore from '../Context/createStore'
import FetchApi from '../CustomHook/useFetchApi'
// import "./Category.css"

function Category() {
    let [apiData, setApiData] = useState([])
    let [filterData, setFilterData] = useState([])
    let { data } = useContext(createStore)
    let refall = useRef();
    let refdress = useRef();
    let refsaree = useRef();

    let returnData = FetchApi("http://localhost:3000/products")
    console.log(returnData, "returnfetchdata")

    useEffect(() => {
        setApiData(returnData)
        setFilterData(returnData)
    }, [returnData])

   

    function clothfilter(cat) {
        debugger
        console.log("cloth filter")
        let dress = document.getElementById("1")
        let all = document.getElementById("3")
        let saree = document.getElementById("2")


        if (cat != "all") {
            if (saree.checked == true || dress.checked == true) {
                all.checked = false;
                if (dress.checked == true) {


                    if (dress.value == "") {
                        dress.value = JSON.stringify(filter("dress"))
                        // console.log((dress.value),"dress.value")
                    }


                    filter()
                }
                if (saree.checked == true) {
                    if (saree.value == "") {
                        saree.value = JSON.stringify(filter("saree"))
                    }
                }

                let checkboxes = document.getElementsByName('cloth')
                let result = "";
                for (var i = 0; i < checkboxes.length; i++) {
                    if (checkboxes[i].checked) {
                        // if (checkboxes[i] != 0) {
                        if (result == "") {
                            result = JSON.parse(checkboxes[i].value)
                            
                        }
                        else {
                            let check=JSON.parse(checkboxes[i].value)
                            result = [...result,...check]
                        }

                        // }

                    }

                }

                // for(i=0;i<result.length;i++){
                //     console.log(...result,"result")
                // }
                console.log(result,"result")
                setFilterData(result)
            }
            else {
                saree.checked = false;
                dress.checked = false;
                all.checked=true;
                let filterData1 = apiData.map((val) => {
                    return val
    
                })
                console.log(filterData1, "filterData1")
                setFilterData(filterData1)
    
            }

        }
        else {
            saree.checked = false;
            dress.checked = false;
            all.checked=true;
            let filterData1 = apiData.map((val) => {
                return val

            })
            console.log(filterData1, "filterData1")
            setFilterData(filterData1)

        }
    }
        
        function filter(data) {
            let filterData1 = apiData.filter((val) => {
                return val.category == data

            })
            console.log(filterData1, "filterData1result")
            //setFilterData(filterData1)
            return filterData1
        }




        return (
            <div>
                
                <h1 className="headdingp">Category</h1>
                <div>
                    <input ref={refall} type="checkbox" value="" id="3" onClick={() => { clothfilter("all") }} />
                    <label for="3">All</label>&nbsp;&nbsp;&nbsp;

                    <input ref={refdress} type="checkbox" name="cloth" value="" id="1" onClick={() => { clothfilter("dress") }} />
                    <label for="1">Dress</label>&nbsp;&nbsp;&nbsp;

                    <input ref={refsaree} type="checkbox" name="cloth" value="" id="2" onClick={() => { clothfilter("saree") }} />
                    <label for="2">Sarees</label>&nbsp;&nbsp;&nbsp;
                </div>
                <div className='boxContainer'>
                    {
                        filterData.map((val) => {
                            var pp = `../productdesc/${val.id}`
                            return (
                                <>
                                <div className='maindivlink'>
                                    <Link to={pp} className='link'>
                                        <div className='box'>
                                            <img src={val.image[0]} alt="" />
                                            <p>{val.name}</p>
                                            <p>₹{val.price}</p>
                                            <p>{val.discount}% OFF</p>
                                        </div>
                                    </Link>
                                    </div>
                                </>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

    export default Category
