import React from "react"
import {EventState} from "../interfaces"
import banner from "../assets/TOP.png"


export let eventContext =  React.createContext<EventState|{}>({})

export const ViewContainer : React.FC = ({children})=>{
  

    return (
        
        <div className="vw-100 h-100" style={{backgroundImage: `linear-gradient(#e66465, #ECAD2B)`, minHeight:"100vh"}}>
            <div className="flex justify-center mb3">
                <img src={banner} style={{maxWidth: "100%",  height: "auto"}}></img>
            </div>
           
            {children}
            
        </div>
    )
}