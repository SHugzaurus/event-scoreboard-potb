import { motion } from 'framer-motion'
import {Player, PodiumData} from "../interfaces"
import React from "react";




export const  PodiumStep : React.VoidFunctionComponent<PodiumData> = ({ podium, winner }) => {
    const offset = podium.length - winner.position
    return (
      <div className="flex flex-column items-center"
        
      >
        <motion.div
          style={{
            alignSelf: 'center',
            marginBottom: '.25rem',
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                delay: (offset + 2)/4,
                duration: 0.2,
              },
            },
          }}
        >
            <div className = "bg-white br-pill pa2 relative">         
                <p className="b dark-pink">{winner.name} - {winner.score} pts</p>
            </div>
         
        </motion.div>
        <motion.div className="w-100"
          style={{
            backgroundColor:`${winner.position === 0 ? "gold": winner.position===1 ? "silver" : "saddlebrown"}`,
            borderColor: 'white',
            borderTopLeftRadius: '.5rem',
            borderTopRightRadius: '.5rem',
            display: 'flex',
            filter: `opacity(${0.1 + offset / podium.length})`,
            marginBottom: -1,
            placeContent: 'center',
            
          }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { height: 0, opacity: 0 },
            visible: {
              height: 200 * (offset / podium.length),
              opacity: 1,
              transition: {
                delay:  offset/4,
                duration: .8,
                ease: 'backInOut',
              },
            },
          }}
        >
          <span style={{ alignSelf: 'flex-end', color: 'white' }}>
            {winner.position + 1}
          </span>
        </motion.div>
      </div>
    )
  }

