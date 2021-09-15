import React from "react";
import {PodiumStep} from './PodiumStep'
import { Player, OrderedPlayer } from "../interfaces";

type Props = {winners : Array<Player>}

export const  Podium : React.VoidFunctionComponent<Props> = ({winners}) => {

  let podium : Array<OrderedPlayer> = [];  
  if(winners?.length >0){
    if(winners[2])
    podium = [{...winners[2], position: 2}];
    if(winners[1]){
        podium = [{...winners[1], position: 1},{...winners[0], position: 0},...podium];
    }
    else podium = [{...winners[0], position: 0}];
  }

  return (
    <div 
      style={{
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        display: 'grid',
        gap: '.5rem',
        gridAutoFlow: 'column dense',
        justifyContent: 'center',
        justifyItems: 'center',
        height: 250,
        marginTop: '2rem',
      }}
    >
      {podium.map((winner) => (
        <PodiumStep key={winner.key} podium={podium} winner={winner} />
      ))}
    </div>
  )
}


