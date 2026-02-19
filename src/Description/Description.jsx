import axios from 'axios'
import  { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./description.css"

function Description() {
  let [count, setCount] = useState(1)
  let param = useParams()
  let id = param.id
  console.log(param, "param")

  let [singleData, setsingleData] = useState([])
  let [image, setImage] = useState("")

  function getData() {
    axios.get(`http://localhost:3000/products/${id}`)
      .then((resp) => {
        console.log(resp.data, "resp  inside product desc")
        setsingleData([resp.data])
        setImage(resp.data.image[0])
      })
  }

  useEffect(() => {
    getData()
  }, [param])

  console.log(singleData, "singleData")


  function addToCart(val) {
    // debugger


    // setAddtocart1(true)
    console.log(val, "val")
    let newData = { ...val, addToCart: true, quantity: count }
    console.log(newData, "newdata")

    updateData(val.id, newData)
  }


  function addtowish(val) {
    // debugger
    // setaddtowish1(true)


    let newData = { ...val, addtowish: true }
    console.log(newData, "wishlistnew data")
    updateData(val.id, newData)
  }

  function updateData(id, newData) {
    axios.put(`http://localhost:3000/products/${id}`, newData)
      .then((resp) => {
        console.log(resp.data, "cart data")
        getData()
      })
    
  }

  return (
    <div>
      <h1 className="headdingp">Description</h1>
      {
        singleData.map((val) => {
          console.log(val.image[0], "ll")
          return (

            <>
              <div className='mainContainer'>
                <div className='imgContainer'>
                  <div className='mainImg'>
                    <img src={image} alt="" />
                  </div>
                  <div className='downImage'>
                    <div className='sImg' onMouseOver={() => { setImage(val.image[1]) }}>
                      <img src={val.image[1]} alt="" />
                    </div>
                    <div className='sImg' onMouseOver={() => { setImage(val.image[2]) }}>
                      <img src={val.image[2]} alt="" />
                    </div>
                    <div className='sImg' onMouseOver={() => { setImage(val.image[0]) }}>
                      <img src={val.image[0]} alt="" />
                    </div>
                  </div>
                </div>
                <div className='descContainer'>
                  <div>
                    <h1>{val.name}</h1>
                  </div>

                  <div>
                    <h2>{val.description}</h2>
                    <h3>₹{val.price * count}</h3>
                    <button className='btncount' onClick={() => { setCount(count + 1) }}>+</button>
                    {count}
                    <button className='btncount' onClick={() => { count>1 && setCount(count - 1) }}>-</button><br />
                    <button className='btnaddto' onClick={() => { addtowish(val) }}>wishlist</button>
                    <button className='btnaddto' onClick={() => { addToCart(val) }}>Add to cart</button>
                  </div>

                </div>
              </div>
            </>

          )
        })
      }
    </div>
  )
}

export default Description
