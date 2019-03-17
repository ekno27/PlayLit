import React from "react";
import TrackInfo from "./trackInfo";

const Results = (props) =>{
    var trackInfoList = props.playlistInfo.tracks.map((trackDetails,key) =><TrackInfo trackInfo={trackDetails} key={key}></TrackInfo>)
    return(
        
        <div className="results">
            <div className="row">
                <div className="col s12">
                    <h2 className="results__title">Litness Analysis of your playlist: <strong>{props.playlistInfo.playlist_name}</strong>
                    </h2>
                </div>
                
            </div>    
            <div className="row">{trackInfoList}</div>
        </div>
        );


    
}
export default Results;