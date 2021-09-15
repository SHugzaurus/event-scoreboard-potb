import React from "react";
import { OrderedPlayer, Player } from "../interfaces";

type Props = { player: OrderedPlayer, key: number }

export const ScorePlayerItem: React.FC<Props> = ({ player }) => {

    return (
        <div className="flex  justify-between bg-white br2 mv2 ph2 mh2" style={{ minWidth: "300px" }}>
            <div className=" flex justify-center items-center">
                <div style={{ height: "25px", width: "25px", textAlign: "center", verticalAlign: "center", display: "table-cell", overflow: "hidden" }}
                    className=" br-100 bg-dark-pink pt1"
                >
                    <span className="b white">{player.position}</span>
                </div>
            </div>
            <div className=" flex justify-center mr2">
                <p className="b dark-pink">{player.name} - {player.score} pts</p>
            </div>
        </div>
    )
}