import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Global attributes
var CloudyWeather = './clouds-dark-dark-clouds-416920.jpg';
var SunnyWeather = './blue-sky-bright-clouds-912364.jpg';
var RainyWeather = './bubble-clean-clear-1028600.jpg';
var StormWeather = './lightning-sky-storm-53459.jpg';
const apiKey = ""; //Remove before committing and pushing
const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=6167865&APPID=" + apiKey + "&units=metric"; //hardcoded city for now because I'm not looking at search function yet
//End global attributes

class Timer extends React.Component{ //The API has a 10 minute recommendation so we set this up to avoid asking too many times
	constructor(props){
		super(props);
	}
}

class InfoWeather extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error:null,
			isLoaded:false,
			wInfo: null
		}
	}
	componentDidMount(){
		fetch(apiURL)
		  .then(res => res.json())
		  .then(
			(result) => {
			  this.setState({
				isLoaded: true,
				wInfo: result
			  });
			},(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )
	}
	render() {
	  console.log(this.state.wInfo);
	  const {error, isLoaded, wInfo} = this.state;
	 if(this.state.wInfo === null){
		 return <div className="infoWeather"></div>
	 }else{
    return (
      <div className="infoWeather">
		<div className="curRow">
			<div className="curCity cur">{wInfo.name}: </div>
			<div className="curTemp cur"> {wInfo.main.temp} &deg; C. </div>
		</div>
		<div className="curRow">
			<div className="curMax curMisc"> Max<br/> {wInfo.main.temp_max} &deg; C </div>
			<div className="curMin curMisc"> Min<br/> {wInfo.main.temp_min} &deg; C </div>
		</div>
	    <div className="curCond cur">{wInfo.weather[0].description} <img src={`http://openweathermap.org/img/wn/${wInfo.weather[0].icon}@2x.png`} className="imgIcon"/></div>
        
      </div>
    );
	 }
  }
}
class MakeTop extends React.Component {
	constructor(props){
		super(props);
		this.state = {value: ''};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(event) {
		this.setState({value: event.target.value});
	}
	handleSubmit(event) {
		event.preventDefault();
		var CityList = findCity(this.state.value);
		alert('A name was submitted: ' + this.state.value);	

    }
	componentDidMount(){
	}
	render() {
		return (
			<div className="header">
			<form onSubmit={this.handleSubmit}>
			  <label>
				<b>Search City:</b>
				<input type="text" value={this.state.value} name="cityName" onChange={this.handleChange} />
			  </label>
			  <input type="submit" value="Search" />
			</form>
			</div>
		);
	}
}
class Interface extends React.Component {
	constructor(props){ //Eventually I'll need this to pass city information to InfoWeather
		super(props);
		
	}
	
  renderWeather() {
    return <InfoWeather />;
  }
  renderDiv(){
	return <MakeTop />;
  }

  render() {
    return (
	
      <div className="body">
	  {this.renderDiv()}
        <div className="board-row">
          {this.renderWeather()}
		</div>
	  <div className="footer">
		<p>Image courtesy of Pexels.</p>
	  </div>
      </div>


    );
  }
}

// ========================================

ReactDOM.render(
  <Interface />,
  document.getElementById('root')
);

function findCity(cityName){ /* Returns a list of potential cities based on city name */
	 var xCity = require('./city.list.json');
	 /*xCity.onreadtstatechange = function(){
		 if(this.readyState == 4 && this.status ==200){
			 
		 }
	 }
	 xCity.open("GET","./city.list.json", true);
	 xCity.send();
	 return JSON.parse(xCity.responseText);*/
}
