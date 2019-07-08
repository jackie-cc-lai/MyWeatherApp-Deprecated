import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Global attributes
const apiKey = ""; //Remove before committing and pushing
const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=6167865&APPID=" + apiKey + "&units=metric"; //hardcoded city for now because I'm not looking at search function yet
const apiURL2 = "http://api.openweathermap.org/data/2.5/forecast?id=6167865&APPID=" + apiKey + "&units=metric"; //hardcoded city for now because I'm not looking at search function yet
//End global attributes

function parseInfo(fInfo){ //I'll use this to parse future forecast into something that can be easily displayed
	var returnData = new Array(20); //Make new array to parse stuff into, cycle goes: date, min temp, max temp, condition at midday
	var i = 1;
	//Day 1
	returnData[0] = fInfo.list[0].dt_txt.split(" ")[0];
	returnData[1] = fInfo.list[0].main.temp_min;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[0].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[1] > fInfo.list[i].main.temp_min){
			returnData[1] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		
		i++;
	}
	var k = i;
	returnData[2] = fInfo.list[0].main.temp_max;
	i = 1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[0].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[2] < fInfo.list[i].main.temp_max){
			returnData[2] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		i++;
	}
	i = 1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[0].dt_txt.split(" ")[0]){ //Search for same day
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[3] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[3] != fInfo.list[i].weather[0].main){
				returnData[3] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		i++;
	}
	//Day 2
	i = k+1;
	returnData[4] = fInfo.list[k].dt_txt.split(" ")[0];
	returnData[5] = fInfo.list[k].main.temp_min;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[5] > fInfo.list[i].main.temp_min){
			returnData[5] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		
		i++;
	}
	returnData[6] = fInfo.list[k].main.temp_max;
	console.log(returnData[6]);
	i = k+1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[6] < fInfo.list[i].main.temp_max){
			returnData[6] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		i++;
	}
	i = k+1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[7] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[7] != fInfo.list[i].weather[0].main){
				returnData[7] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		i++;
	}
	k=i;
	//Day 3
	i = k+1;
	returnData[8] = fInfo.list[k].dt_txt.split(" ")[0];
	returnData[9] = fInfo.list[k].main.temp_min;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[9] > fInfo.list[i].main.temp_min){
			returnData[9] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		
		i++;
	}
	returnData[10] = fInfo.list[k].main.temp_max;
	console.log(returnData[10]);
	i = k+1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[10] < fInfo.list[i].main.temp_max){
			returnData[10] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		i++;
	}
	i = k+1;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[11] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[11] != fInfo.list[i].weather[0].main){
				returnData[11] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		i++;
	}
	k=i;
	//Day 4
	i = k+1;
	returnData[12] = fInfo.list[k].dt_txt.split(" ")[0];
	/*returnData[13] = 
	returnData[14] = 
	returnData[15] = 
	returnData[16] = fInfo.list[32].dt_txt.split(" ")[0];
	returnData[17] = 
	returnData[18] = 
	returnData[19] = */

	return returnData;
}

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
			cInfo: null,
			fInfo: null
		}
	}
	generateFutureForecast(i){
		const {error, isLoaded, cInfo, fInfo} = this.state;
		if(this.state.cInfo === null){
			return null
		}else{
			return(
			<div className="curRow">
				<div className="curMisc cur">{fInfo[i]}</div>
				<div className="curMin curMisc cur">{fInfo[i+1]}</div>
				<div className="curMax curMisc cur">{fInfo[i+2]}</div>
				<div className="curMisc cur">{fInfo[i+3]}</div>
			</div>
			);
		}
	}
	componentDidMount(){
		Promise.all([
		fetch(apiURL), fetch(apiURL2)
		]).then(([res1, res2]) => { 
			return Promise.all([res1.json(), res2.json()]) 
		}).then(
			([result1, result2]) => {
			  var fparse = parseInfo(result2);
			  console.log(fparse);
			  this.setState({
				isLoaded: true,
				cInfo: result1,
				fInfo: fparse
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
	  console.log(this.state.cInfo);
	  console.log(this.state.fInfo);
	  const {error, isLoaded, cInfo, fInfo} = this.state;
	 if(this.state.cInfo === null){
		 return <div className="infoWeather"></div>
	 }else{
    return (
      <div className="infoWeather">
		<div className="curRow">
			<div className="curCity cur">{cInfo.name}: </div>
			<div className="curTemp cur"> {cInfo.main.temp} &deg; C </div>
			<div className="curCond cur"><img src={`http://openweathermap.org/img/wn/${cInfo.weather[0].icon}@2x.png`} className="imgIcon"/></div>	
		</div>
		<div className="curRow">
			<div className="cur">
				<div className="curMax curMisc"> Max<br/> {cInfo.main.temp_max} &deg; C </div>
				<div className="curMin curMisc"> Min<br/> {cInfo.main.temp_min} &deg; C </div>
			</div>
			<div className="cur">
				<div className="curMisc"> Humidity <br/> {cInfo.main.humidity} % </div>
				<div className="curMisc"> Wind <br/> {cInfo.wind.speed} kph </div>
			</div>
		</div>
		{this.generateFutureForecast(0)}
		{this.generateFutureForecast(4)}
		{this.generateFutureForecast(8)}
	    
        
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
