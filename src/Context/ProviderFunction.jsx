import { useState } from "react"
import createStore from "./createStore"

function ProviderFunction({ children }) {
 let [data,setData]=useState("")

    return (
        <>
            {/* <h1>Provider Function</h1> */}
            <createStore.Provider value={{data,setData}}>
                {children}
            </createStore.Provider>

        </>
    )


}

export default ProviderFunction