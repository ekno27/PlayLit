import React from "react";

const TrackInfo = (props)=>{
  var valencePercentage = Math.ceil(props.trackInfo.valence * 100);
  var energyPercentage = Math.ceil(props.trackInfo.energy * 100);
  
  var styleValence ={
    width: valencePercentage+"%",
  }

  var styleEnergy ={
    width: energyPercentage+"%"
  }

  var valenceDisplay = `${valencePercentage}% Valence`;
  var energyDisplay = `${energyPercentage}% Energy`;

  
  return(
    <div className="trackInfo row" key={props.trackInfo.trackName}>
      <div className="col s3">
        <img className="trackInfo__image" src={props.trackInfo.albumArt.url} alt={props.trackInfo.trackName}/>
            <h3 className="trackInfo__song-info">{props.trackInfo.trackName}</h3>
            <h3 className="trackInfo__album-info">{props.trackInfo.albumName}</h3>    
      </div>
      <div className="col s9">
        <div className="progress  search__progress-bar-parent ">
          <div className="search__progress-bar--valence determinate " style={styleValence}>
            <span className="search__display-percentage">{valenceDisplay}</span>
          </div>
        </div>
        <div className="progress  search__progress-bar-parent ">
          <div className="search__progress-bar--energy determinate" style={styleEnergy}>
            <span className="search__display-percentage" >{energyDisplay}</span>
          </div>
        </div>
    </div>
    </div>);
}   

export default TrackInfo;