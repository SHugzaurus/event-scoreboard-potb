import React from "react";
import { PlayerUpdate } from "../interfaces";


export const IngamePlayerItem: React.FC<PlayerUpdate> = ({name,score,id, updateFunction}) => {

    return(
        <div className="flex  justify-between bg-white br2 mv2 ph2 mh2" style={{minWidth : "300px"}}>
            <div className=" flex justify-center mr2">
                <p className="b dark-pink">{name}</p>
            </div>
            <div className=" flex justify-center items-center">
                <div style={{height : "25px",width:"25px",textAlign:"center",verticalAlign:"center",display:"table-cell",overflow: "hidden"}} 
                className="grow pointer dim br-100 bg-dark-pink pt1"
                onClick={()=>{updateFunction(id,-1)}}>
                    <span className="b white"> - </span>
                </div>
                <p className="b ph2">{score}</p>
                <div  style={{height : "25px",width:"25px" ,textAlign:"center",verticalAlign:"center",display:"table-cell",overflow: "hidden"}}
                className="grow pointer dim  br-100 bg-dark-pink pt1"
                onClick={()=>{updateFunction(id,1)}}>
                    <span className="b white " > + </span>
                </div>
            </div>
        </div>
    )
}