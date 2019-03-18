import React from "react";

const TrackInfo = (props)=>{

  //Variables made to ease the use of spotify song stats
  var valencePercentage = Math.ceil(props.trackInfo.valence * 100);
  var energyPercentage = Math.ceil(props.trackInfo.energy * 100);
  var danceabilityPercentage = Math.ceil(props.trackInfo.danceability *100);
  var styleValence ={
    width: valencePercentage+"%",
  }
  var styleEnergy ={
    width: energyPercentage+"%"
  }
  var styleDanceability = {
    width: danceabilityPercentage +"%"
  }
  var valenceDisplay = `${valencePercentage}%`;
  var energyDisplay = `${energyPercentage}%`;
  var danceabilityDisplay = `${danceabilityPercentage}%`;

  //adding all artists to the artist jsx element
  var artists =''
  props.trackInfo.trackArtist.forEach(artistInfo => {
    artists += artistInfo.name +", ";
  });
  artists = artists.substring(0, artists.length-2)


  return(
    <div className="trackInfo row" key={props.trackInfo.trackName}>
      <div className="col s12 m3">
        <img className="trackInfo__image" src={props.trackInfo.albumArt.url} alt={props.trackInfo.trackName}/>
            <h3 className="trackInfo__song-info">{props.trackInfo.trackName}</h3>
            <h3 className="trackInfo__album-info">{artists}</h3>    
      </div>
      <div className="col s12 m9 trackInfo__bar-wrapper">
        <div className="row">
          <div className="col s10">
            <div className="progress  search__progress-bar-parent ">
              <div className="search__progress-bar--valence determinate " style={styleValence}>
            </div>
        </div>
          </div>
          <div className="col s2">
            <span className="search__display-percentage search__display-valence">{valenceDisplay}</span>
          </div>
        </div>
        <div className="row">
          <div className="col s10">
            <div className="progress  search__progress-bar-parent ">
              <div className="search__progress-bar--energy determinate" style={styleEnergy}>
              </div>
            </div>
          </div>
          <div className="col s2">
            <span className="search__display-percentage search__display-energy" >{energyDisplay}</span>
          </div>
        </div>
        <div className="row">
          <div className="col s10">
            <div className="progress  search__progress-bar-parent ">
              <div className="search__progress-bar--dance determinate" style={styleDanceability}>
              </div>
            </div>
          </div>
          <div className="col s2">
            <span className="search__display-percentage search__display-dance" >{danceabilityDisplay}</span>
          </div>
        </div>
          
          

    </div>
    </div>);
}   

export default TrackInfo;