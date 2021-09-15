import React, { useState, useEffect } from "react";
import { Player, EventState } from "../interfaces";
import ReactModal from "react-modal";
import { IngamePlayerItem } from "components/IngamePlayerItem";
import { v4 as uuidv4 } from 'uuid';
import { Link } from "react-router-dom"
import { useLocation } from "react-router";
import {FaThLarge, FaFileImport} from "react-icons/fa"


export const GameView: React.VoidFunctionComponent = () => {
    const location = useLocation();
    const navigationEvent: EventState = location.state?.currentEvent;
    const [event, setEvent] = useState<EventState>(navigationEvent || {});
    const [newPlayerName, setNewPlayerName] = useState<string>("")
    const [players, setPlayers] = useState<Array<Player>>(event.players || []);
    //gestion modale ajout joueur
    const [modalOpened, setModalOpened] = useState<boolean>(false);
    const [importModalOpened, setImportModalOpened] = useState<boolean>(false);
    const [importString, setImportString] = useState<string>("");
    const [shouldShowError,setShouldShowError] = useState<boolean>(false);
    //ajout d'un joueur
    const addPlayer = () => {
        if (newPlayerName !== "") {
            const tempPlayers: Array<Player> = [...players, { key: uuidv4(), name: newPlayerName, score: 0 }]
            setPlayers(tempPlayers);
            const currentEvent: EventState = { id: "kikou", winnerTitle: event.winnerTitle, name: event.name, players: tempPlayers, date: new Date() };
            setEvent(currentEvent);
        }

        setModalOpened(false);
        setNewPlayerName("");
    }

    const onNewPlayerNameInput = (event) => {
        setNewPlayerName(event.target?.value || "");
    }

    const focusOnInput = () => {
        if (modalOpened)
            document.getElementById("newPlayerNameInput")?.focus();
    }



    const updatePlayerScore = (id: string, amount: number) => {
        let tempPlayers: Array<Player> = [...players];
        const foundIndex: number = tempPlayers.findIndex((p: Player) => p.key === id);
        if (foundIndex !== -1) {
            tempPlayers[foundIndex] = { ...tempPlayers[foundIndex], score: tempPlayers[foundIndex].score + amount };
        }
        setPlayers(tempPlayers);
        const currentEvent: EventState = { id: "kikou", winnerTitle: event.winnerTitle, name: event.name, players: tempPlayers, date: new Date() };

        setEvent(currentEvent);

    }


    const changeImportString = (event) => {
        const curVal = event.currentTarget.value;
        setImportString(curVal);
    } 

    const tryToImport = (event) =>{
        
        try {
            const game : EventState = JSON.parse(importString);
            setShouldShowError(false);
            let newEvent : EventState ={name : "kikou", id :"kikou", date: new Date(), winnerTitle : "Noob", players : [] };
            if(game.name) newEvent.name=game.name;
            if(game.date) newEvent.date=game.date;
            if(game.players) newEvent.players=game.players;
            if(game.winnerTitle) newEvent.winnerTitle=game.winnerTitle;
            if(game.id) newEvent.id=game.id;
            setPlayers(newEvent.players);
            setEvent(newEvent);
            setImportModalOpened(false);
        }
        catch(error){
            setShouldShowError(true);
        }
        
    }

    return (
        <div className="pa2">
            <div className="nButtonZone flex justify-end w-100 flex-wrap">
                <div className="bg-dark-pink br-pill  ph3 dim grow flex items-center mb2 mr2"
                    onClick={() => { setImportModalOpened(true); }}>
                    <FaFileImport color="#FFFFFF"/>
                    <p className="b white ml2">Importer une partie</p>
                </div>
                <Link  style={{ textDecoration: 'none' }} to={{
                    pathname: "Score",
                    state: {
                        currentEvent: event
                    }
                }}>
               <div className="bg-dark-pink br-pill  ph3 dim grow flex items-center mb2 mr2" >
                    <FaThLarge color="#FFFFFF"/>
                    <p className="white b ml2">Voir les résultats</p>
                </div>
                </Link>
                <div className="bg-dark-pink br-pill  ph3 dim grow flex items-center mb2"
                    onClick={() => { setModalOpened(true); }}>
                    <p className="b white">+ Ajouter un joueur</p>
                </div>

            </div>

            <div className="w-100 flex flex-wrap items-center justify-center mt2">
                {
                    players.sort((a, b) => a.name.toUpperCase() < b.name.toUpperCase() ? -1 : 1).map((player: Player) => {
                        return (
                            <IngamePlayerItem name={player.name} score={player.score} id={player.key} updateFunction={updatePlayerScore} />
                        )
                    })
                }
            </div>
            <ReactModal isOpen={modalOpened}
                contentLabel="Ajouter un joueur"
                style={{
                    overlay: {
                        backgroundColor: "#ffffffB3"
                    },
                    content: {
                        position: "absolute",
                        margin: "auto",
                        height: "180px",
                        maxWidth: "60%",
                        width: "350px",
                        borderRadius: "15px"
                    }
                }}
                onAfterOpen={focusOnInput}
                appElement={document.getElementById('root') || undefined}
            >
                <div className="flex flex-column justify-center w-100 h-100 items-center">
                    <div className="flex justify-center pv2 w-100">
                        <input id="newPlayerNameInput" placeholder="Nom..." className="b helvetica dark-pink"
                            onInput={onNewPlayerNameInput} />
                    </div>
                    <div className="flex justify-center w-100 mt2">
                        <div className="flex justify-center bg-dark-pink link dib grow pointer br-pill justify-center ph1"
                            style={{ width: "80px" }}
                            onClick={addPlayer}>
                            <p className="b white helvetica">OK</p>
                        </div>
                    </div>
                </div>

            </ReactModal>
            <ReactModal isOpen={importModalOpened}
                contentLabel="Ajouter un joueur"
                style={{
                    overlay: {
                        backgroundColor: "#ffffffB3"
                    },
                    content: {
                        position: "absolute",
                        margin: "auto",
                        height: "180px",
                        maxWidth: "60%",
                        width: "350px",
                        borderRadius: "15px"
                    }
                }}
                onAfterOpen={focusOnInput}
                appElement={document.getElementById('root') || undefined}
            >
                <div className="flex flex-column justify-center w-100 h-100 items-center">
                    <div className="flex justify-center pv2 w-100">
                        <input id="newPlayerNameInput" value={importString} placeholder="Coller le bouzin ici..." className="b helvetica dark-pink"
                            onChange={changeImportString} />
                    </div>
                    {
                        shouldShowError ?
                        <p className="red"> chaine invalide ^^ </p>: null
                    }
                    <div className="flex justify-center w-100 mt2">
                        <div className="flex justify-center bg-dark-pink link dib grow pointer br-pill justify-center ph1 mr2"
                            style={{ width: "80px" }}
                            onClick={tryToImport}>
                            <p className="b white helvetica">OK</p>
                        </div>
                        <div className="flex justify-center bg-dark-pink link dib grow pointer br-pill justify-center ph1"
                            style={{ width: "80px" }}
                            onClick={()=>{setImportModalOpened(false)}}>
                            <p className="b white helvetica">Annuler</p>
                        </div>
                    </div>
                </div>

            </ReactModal>
           
        </div>
    )
}