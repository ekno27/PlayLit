import React from "react";
import { Link, Route } from "react-router-dom";
import Results from "./results";
import axios from "axios";


class Search extends React.Component{

  state = {
    articles: [],
    
  }

  click = ()=>{
    console.log("i am clicked");
      axios.get("/getPlaylistsTracks").then(res=>{
      this.setState({articles:res.data})
  });
  }

  handleNameChange = (event)=>{
    this.setState({articleName:event.target.value});
  }


  render(){

    

    return(
      <div>
        <br/>
        <br/>
            <div className="row">
              <div className="input-field col s12">
                <input onChange={this.handleNameChange}id="articleName" type="text"
                  placeholder="Enter Article" 
                  className="validate"/>
              </div>
            </div>
            <a onClick={this.click} id="send-btn" className= "btn waves-effect waves-light btn-large center-align valign-wrapper" >Submit</a>
            
            
            {/* <Results items={this.state.articles}></Results> */}
      </div>)
  }
  

}

export default Search;
