import React from "react";
import Results from "./results";
import axios from "axios";

class Search extends React.Component{

  state = {
    playlistInfo:{},
    playlistId: '' 
  }

  submitPlaylist = ()=>{
    if(this.state.playlistId !=='') {
      this.setState({playlistInfo:''})
      var playlistId = this.state.playlistId
      axios.get(`/getPlaylistsTracks/${playlistId}`)
      .then(res=>{
        this.setState({playlistInfo:res.data});
      }).catch(failure =>{
        if (failure.response.status===400) {
          alert("Invalid Playlist ID. Please enter a valid Spotify Playlist ID ")
        }else{
        alert("hmmm, something went wrong. Check dev tools for more info");

        }
      });
    }
    else {
      alert("enter a valid playlist id!");
    }
  }

  handleIdChange = (event)=>{
    this.setState({playlistId:event.target.value});
  }
  
  render(){
    var resultsComponent;
    if( this.state.playlistInfo.hasOwnProperty("playlist_name")===false ){
      resultsComponent = <p className="center-align search__instructions">
      Welcome to Playlit! Enter your <strong>Spotify playlist's ID</strong> and find out how <strong>lit</strong> your songs are!
      </p>
    }
    else {
      resultsComponent = <Results playlistInfo={this.state.playlistInfo}></Results>  
    }

    return(
      <div className="search">
        <br/>
        <br/>
            <div className="row">
              <div className="col s12 m2 l2"></div>
              <div className="col s12 m8 l8">
                <div className="input-field">
                  <input onChange={this.handleIdChange} type="text"
                    placeholder="Enter Playlist Id" 
                    className="validate"/>
                  <a onClick={this.submitPlaylist}  className= "btn search__submit-button align-center waves-effect waves-light " >Submit</a>
                </div>
              </div>
              <div className="col s12 m2 l2"></div>
            </div>
            <div className="row">
              {resultsComponent}
            </div>
            
      </div>)
  }
  

}

export default Search;
