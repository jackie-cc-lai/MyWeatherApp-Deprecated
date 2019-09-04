import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//Global attributes
var apiKey = "&APPID=INSERT_API_KEY&units=metric"; //Insert API Key before running npm start/npm build
var city_Toronto = "6167865"; //city ID of Toronto
var city_Markham = "6066513";
var city_Taipei = "1668341";
var apiURL = "http://api.openweathermap.org/data/2.5/weather?id="; 
var apiURL2 = "http://api.openweathermap.org/data/2.5/forecast?id=";

//End global attributes

function WindDir(deg){
	if(deg >= 5 && deg < 40){
		return "NNE";
	}else if (deg >= 40 && deg < 50){
		return "NE";
	}else if (deg >= 50 && deg < 85){
		return "NEE";
	}else if (deg >= 85 && deg < 95){
		return "E";
	}else if (deg >= 95 && deg < 130){
		return "ESE";
	}else if (deg >= 130 && deg < 140){
		return "SE";
	}else if (deg >= 140 && deg < 175){
		return "SSE";
	}else if (deg >= 175 && deg < 185){
		return "S";
	}else if (deg >= 185 && deg < 220){
		return "SSW";
	}else if (deg >= 220 && deg < 230){
		return "SW";
	}else if (deg >= 230 && deg < 270){
		return "WSW";
	}else if (deg >= 270 && deg < 280){
		return "W";
	}else if (deg >= 280 && deg < 315){
		return "WNW";
	}else if (deg >= 315 && deg < 325){
		return "NW";
	}else if (deg >= 325 && deg < 355){
		return "NNW";
	}else return "N";
	
}

function parseInfo(fInfo){ //I'll use this to parse future forecast into something that can be easily displayed
	var returnData = new Array(20); //Make new array to parse stuff into, cycle goes: date, min temp, max temp, condition at midday, wind
	var i = 1;
	//Day 1
	returnData[0] = fInfo.list[0].dt_txt.split(" ")[0];
	returnData[1] = fInfo.list[0].main.temp_min;
	returnData[2] = fInfo.list[0].main.temp_max;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[0].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[1] > fInfo.list[i].main.temp_min){
			returnData[1] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		if(returnData[2] < fInfo.list[i].main.temp_max){
			returnData[2] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[3] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[3] != fInfo.list[i].weather[0].main){
				returnData[3] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[4] = fInfo.list[i].wind.speed;
			returnData[5] = WindDir(fInfo.list[i].wind.deg);
		}
		
		i++;
	}
	var k = i;
	//Day 2
	i = k+1;
	returnData[6] = fInfo.list[k].dt_txt.split(" ")[0];
	returnData[7] = fInfo.list[k].main.temp_min;
	returnData[8] = fInfo.list[k].main.temp_max;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[7] > fInfo.list[i].main.temp_min){
			returnData[7] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		if(returnData[8] < fInfo.list[i].main.temp_max){
			returnData[8] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[9] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[9] != fInfo.list[i].weather[0].main){
				returnData[9] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[10] = fInfo.list[i].wind.speed;
			returnData[11] = WindDir(fInfo.list[i].wind.deg);
		}
		i++;
	}
	k=i;
	//Day 3
	i = k+1;
	returnData[12] = fInfo.list[k].dt_txt.split(" ")[0];
	returnData[13] = fInfo.list[k].main.temp_min;
	returnData[14] = fInfo.list[k].main.temp_max;
	while(fInfo.list[i].dt_txt.split(" ")[0] === fInfo.list[k].dt_txt.split(" ")[0]){ //Search for same day
		if(returnData[13] > fInfo.list[i].main.temp_min){
			returnData[13] = fInfo.list[i].main.temp_min; //If current recorded min temp > forecasted temp in the next block of data for the same day replace
		}
		if(returnData[14] < fInfo.list[i].main.temp_max){
			returnData[14] = fInfo.list[i].main.temp_max; //If current recorded max temp < forecasted temp in the next block of data for the same day replace
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[15] = fInfo.list[i].weather[0].main;
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "15:00:00"){ //condition at noon
			if(returnData[15] != fInfo.list[i].weather[0].main){
				returnData[15] += "/" + fInfo.list[i].weather[0].main;
			}
		}
		if(fInfo.list[i].dt_txt.split(" ")[1] === "12:00:00"){ //condition at noon
			returnData[16] = fInfo.list[i].wind.speed;
			returnData[17] = WindDir(fInfo.list[i].wind.deg);
		}
		i++;
	}

	return returnData;
}

class InfoWeather extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			error:null,
			isLoaded:false,
			cInfo: null,
			fInfo: null,
			data: this.props.data,
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
				<div className="curMisc cur">{fInfo[i+4]}</div>
				<div className="curMisc cur">{fInfo[i+5]}</div>
			</div>
			);
		}
	}
	componentWillReceiveProps(nextProps) {
		this.setState({ data: nextProps.data,});  

		Promise.all([
		fetch(nextProps.URL1), fetch(nextProps.URL2)
		]).then(([res1, res2]) => { 
			return Promise.all([res1.json(), res2.json()]) 
		}).then(
			([result1, result2]) => {
			  var fparse = parseInfo(result2);
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
	componentDidMount(){
		
		Promise.all([
		fetch(this.props.URL1), fetch(this.props.URL2)
		]).then(([res1, res2]) => { 
			return Promise.all([res1.json(), res2.json()]) 
		}).then(
			([result1, result2]) => {
			  var fparse = parseInfo(result2);
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
		{this.generateFutureForecast(6)}
		{this.generateFutureForecast(12)}
	    
        
      </div>
    );
	 }
  }
}
function InfoCity(props){
		return(
			<button className="buttonCity" onClick={() => props.onClick()}>{props.value}</button>
		);
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
		alert('A name was submitted: ' + this.state.value);	

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
		this.state={URL1: apiURL + city_Toronto + apiKey,
					URL2: apiURL2 + city_Toronto + apiKey,
					data: "Toronto",
		}; //Default is Toronto
		
	}
	handleClick(i){
		console.log(i);
		var newURL1, newURL2;
		if(i == "Toronto"){
			newURL1 = apiURL + city_Toronto + apiKey;
			newURL2 = apiURL2 + city_Toronto + apiKey;
			console.log(newURL1);
		}else if (i == "Markham"){
			newURL1 = apiURL + city_Markham + apiKey;
			newURL2 = apiURL2 + city_Markham + apiKey;
			console.log(newURL1);
		}else if (i == "Taipei"){
			newURL1 = apiURL + city_Taipei + apiKey;
			newURL2 = apiURL2 + city_Taipei + apiKey;
			console.log(newURL1);
		}
		this.setState({
			data: i,
			URL1: newURL1,
			URL2: newURL2,
		});
		console.log(newURL1);
	}
  renderCity(i){
	  return <InfoCity value={i} onClick={()=>this.handleClick(i)} />;
  }
  renderWeather() {
    return <InfoWeather URL1 = {this.state.URL1} URL2 = {this.state.URL2} data={this.state.data}/>;
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
		  <div className="curRow">
		  {this.renderCity("Toronto")}
		  {this.renderCity("Markham")}
		  {this.renderCity("Taipei")}
		  </div>
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
