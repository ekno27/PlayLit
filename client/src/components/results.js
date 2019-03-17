import React from "react";
import TrackInfo from "./trackInfo";

const Results = (props) =>{
    var trackInfoList = props.playlistInfo.tracks.map((trackDetails,key) =><TrackInfo trackInfo={trackDetails} key={key}></TrackInfo>)
    return(
        
        <div className="results">
            <div className="row">
                <div className="col s12 m10">
                    <h2 className="results__title">Litness Analysis of your playlist: <strong>{props.playlistInfo.playlist_name}</strong>
                    </h2>
                    <span className="results__legend-base results__legend--energy"></span>Valence
                    <span className="results__legend-base results__legend--valence"></span>Energy
                    <span className="results__legend-base results__legend--dance"></span>Danceability
                </div>
            </div>    
            <div className="row">{trackInfoList}</div>
        </div>
        );


    
}
export default Results;