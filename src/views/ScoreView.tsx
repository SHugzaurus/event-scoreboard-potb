
import { ScorePlayerItem } from "components/ScorePlayerItem";
import React, {useEffect, useState} from "react"
import { Podium } from "components/Podium";
import {Player, EventState} from "interfaces"
import {Link} from "react-router-dom"
import {useLocation} from "react-router"
import {FaCamera, FaThLarge, FaFileExport,FaInfo} from "react-icons/fa"
import html2canvas from "html2canvas";
import {ToastContainer, toast} from 'react-toastify';
import ReactModal from "react-modal";




const { ipcRenderer } = window.electron;
const injectStyle= require('react-toastify/dist/inject-style');
injectStyle.injectStyle();
export const ScoreView: React.VoidFunctionComponent = () => {   
   
    const location = useLocation();
    let [currentEvent,setCurrentEvent] =useState(location.state?.currentEvent);
    let [currentEventName,setCurrentEventName] =useState(location.state?.currentEvent.name || "");
    let [currentEventWinnerTitle,setCurrentEventWinnerTitle] =useState(location.state?.currentEvent.winnerTitle || "");

    
    let podiumPlayers : Array<Player> = currentEvent.players?.sort((p1:Player,p2:Player) => p2.score - p1.score).slice(0,3);
    let otherPlayers:Array<Player> = currentEvent.players?.sort((p1:Player,p2:Player) => p2.score - p1.score).slice(3);
    let [uri, seturi] = useState<string>('');
    let [exportModalOpened, setExportModalOpened] = useState<boolean>(false);
    let [infoModalOpened, setInfoModalOpened] = useState<boolean>(false);
    useEffect(()=>{
        if(uri !== ''){
            ipcRenderer.copyImage(uri)
            notify();           
            seturi('');
        }
        
    })

    const notify = () => toast("Image copiée dans le presse-papier",{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,    
    });

    const notifyJSON = ()=> toast("Partie exportée",{
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    const getCanvas = ()=>{  
        html2canvas(document.querySelector("#contentDiv")).then((canvas)=>{
            seturi(canvas.toDataURL())
        })    
        
       
    }

    const exportGame = ()=>{
        setExportModalOpened(true);
    }

    const eventNameChanged = (event)=>{
        let tempEvent: EventState = currentEvent;
        if (!tempEvent.date) tempEvent.date = new Date();
        if(!tempEvent.id) tempEvent.id="kikou"
        tempEvent.name= event.currentTarget?.value ||tempEvent.name;
        setCurrentEvent(tempEvent);
        setCurrentEventName(tempEvent.name);
     }

    const eventWTChanged = (event)=>{
        let tempEvent : EventState = currentEvent;
        if (!tempEvent.date) tempEvent.date = new Date();
        if(!tempEvent.id) tempEvent.id="kikou"
        tempEvent.winnerTitle= event.currentTarget?.value ||tempEvent.winnerTitle;
        setCurrentEvent(tempEvent);
        setCurrentEventWinnerTitle(tempEvent.winnerTitle);
     }

    return (
        <div className="w-100">
            <div className="w-100 flex flex-row flex-wrap justify-end pa2">
            <div className="bg-dark-pink br-pill  ph3 dim grow flex items-center mr2 mb2"  onClick={()=>{setInfoModalOpened(true);}}>
                    <FaInfo color="#FFFFFF"/>
                    <p className="white b ml2">Infos complémentaires</p>
                </div>
            <Link
            style={{ textDecoration: 'none' }} to={{
                pathname : "/",
                state : {
                    currentEvent
                }
                }}  >                
                 <div className="bg-dark-pink br-pill  ph3 dim grow flex items-center mb2" >
                    <FaThLarge color="#FFFFFF"/>
                    <p className="white b ml2">Saisie des scores</p>
                </div>
                </Link>
        
                <div className="bg-dark-pink br-pill flex items-center ph3 dim grow ml2 mb2" onClick={getCanvas}>
                    <FaCamera color="#FFFFFF"/>
                    <p className="white b ml2">Capture d'écran</p>
                </div>
                <div className="bg-dark-pink br-pill flex items-center ph3 dim grow ml2 mb2" onClick={exportGame}>
                    <FaFileExport color="#FFFFFF"/>
                    <p className="white b ml2">Exporter la partie</p>
                </div>
            </div>
            <ReactModal isOpen={exportModalOpened}
                contentLabel="Ajouter un joueur"
                style={{      
                    overlay : {
                        backgroundColor:"#ffffffB3"
                    },            
                    content: {
                      position:"absolute",
                      margin : "auto",
                      height: "300px",
                      maxWidth:"60%",
                      width:"350px",
                      borderRadius :"15px"            
                    }
                }}               
                appElement={document.getElementById('root') || undefined}
                >
                <div className="flex flex-column justify-center w-100 h-100 items-center">
                <p className="b helvetica dark-pink">Copie le bloc ci dessous pour partager la partie à un camarade</p>      
                    <div className="flex justify-center pv2 w-100">            
                             
                       <input id="exportInput" value={JSON.stringify(currentEvent)} className="b helvetica"
                        
                       />
                    </div>
                    <div className="flex justify-center w-100 mt2">                        
                        <div className="flex justify-center bg-dark-pink link dib grow pointer br-pill justify-center ph1"
                            style={{width:"80px"}}
                            onClick={()=>{setExportModalOpened(false)}}>
                            <p className="b white helvetica">OK</p>
                        </div>
                    </div>
                </div>

            </ReactModal>
            <ReactModal isOpen={infoModalOpened}
                contentLabel="Ajouter un joueur"
                style={{      
                    overlay : {
                        backgroundColor:"#ffffffB3"
                    },            
                    content: {
                      position:"absolute",
                      margin : "auto",
                      height: "300px",
                      maxWidth:"80%",
                      width:"500px",
                      borderRadius :"15px"            
                    }
                }}               
                appElement={document.getElementById('root') || undefined}
                >
                <div className="flex flex-column justify-center w-100 h-100 items-center">
                <p className="b helvetica dark-pink">Infos supplémentaires pour la copie d'écran</p>      
                    <div className="flex justify-center pv2 w-100">  
                        <p className="b helvetica dark-pink mr2"> Nom de l'event : </p>   
                        <input id="newPlayerNameInput" value={currentEventName} onChange={eventNameChanged}  className="b helvetica"/>                      
                    </div>
                    <div className="flex justify-center pv2 w-100">
                        <p className="b helvetica dark-pink mr2"> Titre du gagnant : </p>
                        <input id="newPlayerNameInput" value={currentEventWinnerTitle} onChange={eventWTChanged}  className="b helvetica"/>
                    </div>     
                    <div className="flex justify-center w-100 mt2">                        
                        <div className="flex justify-center bg-dark-pink link dib grow pointer br-pill justify-center ph1"
                            style={{width:"80px"}}
                            onClick={()=>{setInfoModalOpened(false)}}>
                            <p className="b white helvetica">OK</p>
                        </div>
                    </div>
                </div>

            </ReactModal>
            <div id="contentDiv" className=" flex flex-column br3  pt3 mh2 items-center" style={{backgroundImage: `linear-gradient(#E06AF5, #DA342F)`}}>
                {
                    currentEventName?
                <h1 className="white b pa2 mv3 bw2 br3 ba b--white">{currentEventName} du {new Date(currentEvent.date).toLocaleDateString('fr-FR')}</h1>
                : null
                }
                {
                    podiumPlayers ?
                          <h1 className="white  pa2 tc">Félicitations à <span style={{color: "gold",fontSize : 40, fontWeight :"bolder"}}>{podiumPlayers[0]?.name}</span> qui obtient le titre de <span style={{color: "gold",fontSize : 40, fontStyle :"italic"}}>{currentEventWinnerTitle}</span></h1>
                          : null
                }
              
                <Podium winners={podiumPlayers} />
                <div className="w-100 flex flex-wrap items-center justify-center mt3">
                        {                    
                        otherPlayers?.map((player, index) =>{
                            return(
                                <ScorePlayerItem key={player.key} player={{...player , position : index + 4}} />
                            )
                        })
                        }
                </div>
            </div>
            
           
          <ToastContainer />
        </div>
       
       
    );
}